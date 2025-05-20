import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        job: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            postedById: number;
            filledById: number | null;
            locationId: number | null;
        } | null;
        participants: ({
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: number;
            joinedAt: Date;
            lastReadAt: Date | null;
            userId: number;
            chatId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
    findAll(req: AuthenticatedRequest): Promise<({
        job: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            postedById: number;
            filledById: number | null;
            locationId: number | null;
        } | null;
        participants: ({
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: number;
            joinedAt: Date;
            lastReadAt: Date | null;
            userId: number;
            chatId: number;
        })[];
        messages: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            chatId: number;
            content: string;
            status: import(".prisma/client").$Enums.MessageStatus;
            senderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    })[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        job: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            postedById: number;
            filledById: number | null;
            locationId: number | null;
        } | null;
        participants: ({
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: number;
            joinedAt: Date;
            lastReadAt: Date | null;
            userId: number;
            chatId: number;
        })[];
        messages: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            chatId: number;
            content: string;
            status: import(".prisma/client").$Enums.MessageStatus;
            senderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
    sendMessage(sendMessageDto: SendMessageDto, req: AuthenticatedRequest): Promise<{
        sender: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        chatId: number;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
        senderId: number;
    }>;
    updateMessageStatus(id: string, statusDto: UpdateMessageStatusDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        chatId: number;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
        senderId: number;
    }>;
    markChatAsRead(id: string, req: AuthenticatedRequest): Promise<{
        id: number;
        joinedAt: Date;
        lastReadAt: Date | null;
        userId: number;
        chatId: number;
    }>;
    remove(id: string, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
}
