import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    const { participantIds, jobId } = createChatDto;

    const users = await this.prisma.user.findMany({
      where: { id: { in: participantIds } },
    });

    if (users.length !== participantIds.length) {
      throw new BadRequestException('One or more participants do not exist');
    }

    return this.prisma.chat.create({
      data: {
        jobId,
        participants: {
          create: participantIds.map((userId) => ({
            userId,
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        job: true,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        job: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const chat = await this.prisma.chat.findFirst({
      where: {
        id,
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        job: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException(
        'Chat not found or you are not a participant',
      );
    }

    return chat;
  }

  async findOneByJob(jobId: number, userId: number) {
    const chat = await this.prisma.chat.findFirst({
      where: {
        jobId,
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        job: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            sender: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException(
        'Chat not found or you are not a participant',
      );
    }

    return chat;
  }

  async sendMessage(sendMessageDto: SendMessageDto, senderId: number) {
    const { chatId, content } = sendMessageDto;

    // Verify chat exists and user is a participant
    const chat = await this.prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            userId: senderId,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException(
        'Chat not found or user is not a participant',
      );
    }

    // Create message
    const message = await this.prisma.message.create({
      data: {
        content,
        chatId,
        senderId,
        status: MessageStatus.SENT,
      },
      include: {
        sender: true,
      },
    });

    // Update chat's updatedAt timestamp
    await this.prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async updateMessageStatus(
    messageId: number,
    userId: number,
    statusDto: UpdateMessageStatusDto,
  ) {
    const message = await this.prisma.message.findFirst({
      where: {
        id: messageId,
        chat: {
          participants: {
            some: {
              userId,
            },
          },
        },
      },
    });

    if (!message) {
      throw new NotFoundException(
        'Message not found or user is not a chat participant',
      );
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: { status: statusDto.status },
    });
  }

  async markChatAsRead(chatId: number, userId: number) {
    const participant = await this.prisma.chatParticipant.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
    });

    if (!participant) {
      throw new NotFoundException('Chat participant not found');
    }

    return this.prisma.chatParticipant.update({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
      data: {
        lastReadAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return this.prisma.chat.delete({
      where: { id },
    });
  }
}
