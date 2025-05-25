import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { PrismaService } from '../prisma/prisma.service';

describe('ChatController', () => {
  let controller: ChatController;

  // Mock data
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockRequest = {
    user: mockUser,
  } as AuthenticatedRequest;

  const mockCreateChatDto: CreateChatDto = {
    participantIds: [1, 2],
    jobId: 1,
  };

  const mockSendMessageDto: SendMessageDto = {
    chatId: 1,
    content: 'Test message',
  };

  const mockUpdateMessageStatusDto: UpdateMessageStatusDto = {
    status: 'READ',
  };

  // Mock ChatService
  const mockChatService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByJob: jest.fn(),
    sendMessage: jest.fn(),
    updateMessageStatus: jest.fn(),
    markChatAsRead: jest.fn(),
    remove: jest.fn(),
  };

  // Mock AuthGuard
  const mockAuthGuard = { canActivate: jest.fn().mockReturnValue(true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: mockChatService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ChatController>(ChatController);

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call chatService.create with the provided data', async () => {
      const expectedResult = { id: 1, ...mockCreateChatDto };
      mockChatService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(mockCreateChatDto);

      expect(mockChatService.create).toHaveBeenCalledWith(mockCreateChatDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call chatService.findAll with the user id from the request', async () => {
      const expectedResult = [{ id: 1, name: 'Chat 1' }];
      mockChatService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(mockRequest);

      expect(mockChatService.findAll).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call chatService.findOne with the chat id and user id', async () => {
      const chatId = 1;
      const expectedResult = { id: chatId, name: 'Chat 1' };
      mockChatService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(chatId, mockRequest);

      expect(mockChatService.findOne).toHaveBeenCalledWith(chatId, mockUser.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOneByJob', () => {
    it('should call chatService.findOneByJob with the job id and user id', async () => {
      const jobId = 1;
      const expectedResult = { id: 1, jobId, name: 'Chat 1' };
      mockChatService.findOneByJob.mockResolvedValue(expectedResult);

      const result = await controller.findOneByJob(jobId, mockRequest);

      expect(mockChatService.findOneByJob).toHaveBeenCalledWith(
        jobId,
        mockUser.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('sendMessage', () => {
    it('should call chatService.sendMessage with the message data and user id', async () => {
      const expectedResult = {
        id: 1,
        ...mockSendMessageDto,
        senderId: mockUser.id,
      };
      mockChatService.sendMessage.mockResolvedValue(expectedResult);

      const result = await controller.sendMessage(
        mockSendMessageDto,
        mockRequest,
      );

      expect(mockChatService.sendMessage).toHaveBeenCalledWith(
        mockSendMessageDto,
        mockUser.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateMessageStatus', () => {
    it('should call chatService.updateMessageStatus with the message id, user id, and status data', async () => {
      const messageId = '1';
      const expectedResult = {
        id: 1,
        status: mockUpdateMessageStatusDto.status,
      };
      mockChatService.updateMessageStatus.mockResolvedValue(expectedResult);

      const result = await controller.updateMessageStatus(
        messageId,
        mockUpdateMessageStatusDto,
        mockRequest,
      );

      expect(mockChatService.updateMessageStatus).toHaveBeenCalledWith(
        +messageId,
        mockUser.id,
        mockUpdateMessageStatusDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('markChatAsRead', () => {
    it('should call chatService.markChatAsRead with the chat id and user id', async () => {
      const chatId = '1';
      const expectedResult = { success: true };
      mockChatService.markChatAsRead.mockResolvedValue(expectedResult);

      const result = await controller.markChatAsRead(chatId, mockRequest);

      expect(mockChatService.markChatAsRead).toHaveBeenCalledWith(
        +chatId,
        mockUser.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call chatService.remove with the chat id', async () => {
      const chatId = '1';
      const expectedResult = { success: true };
      mockChatService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(chatId);

      expect(mockChatService.remove).toHaveBeenCalledWith(+chatId);
      expect(result).toEqual(expectedResult);
    });
  });
});
