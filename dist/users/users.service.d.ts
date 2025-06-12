import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getUserProfileById(userId: number): Promise<{
        id: number;
        userId: number;
        name: string;
        age: number | null;
        bio: string | null;
        gender: string | null;
        location: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
    }>;
    getUserResumeById(userId: number): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            workExperience: string;
            education: string;
        };
        message: string;
    } | {
        message: string;
        data?: undefined;
    }>;
    getUserProjectsById(userId: number): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            videoUrl: string | null;
            userId: number;
            title: string;
            description: string;
            projectUrl: string | null;
        }[];
        message: string;
    }>;
}
