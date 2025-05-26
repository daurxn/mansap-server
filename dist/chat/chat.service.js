"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChatDto) {
        const { participantIds, jobId } = createChatDto;
        const users = await this.prisma.user.findMany({
            where: { id: { in: participantIds } },
        });
        if (users.length !== participantIds.length) {
            throw new common_1.BadRequestException('One or more participants do not exist');
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
    async findAll(userId) {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException('Chat not found or you are not a participant');
        }
        return chat;
    }
    async findOneByJob(jobId, userId) {
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
            throw new common_1.NotFoundException('Chat not found or you are not a participant');
        }
        return chat;
    }
    async sendMessage(sendMessageDto, senderId) {
        const { chatId, content } = sendMessageDto;
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
            throw new common_1.NotFoundException('Chat not found or user is not a participant');
        }
        const message = await this.prisma.message.create({
            data: {
                content,
                chatId,
                senderId,
                status: client_1.MessageStatus.SENT,
            },
            include: {
                sender: true,
            },
        });
        await this.prisma.chat.update({
            where: { id: chatId },
            data: { updatedAt: new Date() },
        });
        return message;
    }
    async updateMessageStatus(messageId, userId, statusDto) {
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
            throw new common_1.NotFoundException('Message not found or user is not a chat participant');
        }
        return this.prisma.message.update({
            where: { id: messageId },
            data: { status: statusDto.status },
        });
    }
    async markChatAsRead(chatId, userId) {
        const participant = await this.prisma.chatParticipant.findUnique({
            where: {
                chatId_userId: {
                    chatId,
                    userId,
                },
            },
        });
        if (!participant) {
            throw new common_1.NotFoundException('Chat participant not found');
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
    async remove(id) {
        const chat = await this.prisma.chat.findUnique({
            where: { id },
        });
        if (!chat) {
            throw new common_1.NotFoundException(`Chat with ID ${id} not found`);
        }
        return this.prisma.chat.delete({
            where: { id },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map