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
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            locationId: number | null;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            postedById: number;
            filledById: number | null;
        } | null;
        participants: ({
            user: {
                email: string;
                password: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            chatId: number;
            joinedAt: Date;
            lastReadAt: Date | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
    findAll(req: AuthenticatedRequest): Promise<({
        job: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            locationId: number | null;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            postedById: number;
            filledById: number | null;
        } | null;
        participants: ({
            user: {
                email: string;
                password: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            chatId: number;
            joinedAt: Date;
            lastReadAt: Date | null;
        })[];
        messages: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
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
    findOne(id: number, req: AuthenticatedRequest): Promise<{
        job: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            locationId: number | null;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            postedById: number;
            filledById: number | null;
        } | null;
        participants: ({
            user: {
                email: string;
                password: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            chatId: number;
            joinedAt: Date;
            lastReadAt: Date | null;
        })[];
        messages: ({
            sender: {
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            chatId: number;
            content: string;
            status: import(".prisma/client").$Enums.MessageStatus;
            senderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
    findOneByJob(jobId: number, req: AuthenticatedRequest): Promise<{
        job: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            locationId: number | null;
            description: string;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            postedById: number;
            filledById: number | null;
        } | null;
        participants: ({
            user: {
                email: string;
                password: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            chatId: number;
            joinedAt: Date;
            lastReadAt: Date | null;
        })[];
        messages: ({
            sender: {
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            chatId: number;
            content: string;
            status: import(".prisma/client").$Enums.MessageStatus;
            senderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
    sendMessage(sendMessageDto: SendMessageDto, req: AuthenticatedRequest): Promise<{
        sender: {
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        chatId: number;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
        senderId: number;
    }>;
    updateMessageStatus(id: string, statusDto: UpdateMessageStatusDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        chatId: number;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
        senderId: number;
    }>;
    markChatAsRead(id: string, req: AuthenticatedRequest): Promise<{
        id: number;
        userId: number;
        chatId: number;
        joinedAt: Date;
        lastReadAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
}
