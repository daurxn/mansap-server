import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    update(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
    }>;
    getProfile(userId: number): import(".prisma/client").Prisma.Prisma__ProfileClient<{
        age: number | null;
        gender: string | null;
        bio: string | null;
        locationId: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    createResume(userId: number, createResumeDto: CreateResumeDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        workExperience: string;
        education: string;
    }>;
    getResume(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        workExperience: string;
        education: string;
    } | null>;
}
