import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findAll(userId: number): Promise<({
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
    findOne(id: number, userId: number): Promise<{
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
    sendMessage(sendMessageDto: SendMessageDto, senderId: number): Promise<{
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
    updateMessageStatus(messageId: number, userId: number, statusDto: UpdateMessageStatusDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        chatId: number;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
        senderId: number;
    }>;
    markChatAsRead(chatId: number, userId: number): Promise<{
        id: number;
        joinedAt: Date;
        lastReadAt: Date | null;
        userId: number;
        chatId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jobId: number | null;
    }>;
}
