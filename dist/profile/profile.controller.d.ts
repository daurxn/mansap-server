import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { CreateResumeDto } from './dto/create-resume.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    update(updateProfileDto: UpdateProfileDto, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getProfile(req: AuthenticatedRequest): import(".prisma/client").Prisma.Prisma__ProfileClient<{
        age: number | null;
        gender: string | null;
        locationId: number | null;
        bio: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    createResume(createResumeDto: CreateResumeDto, req: AuthenticatedRequest): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        workExperience: string;
        education: string;
    }>;
    getResume(req: AuthenticatedRequest): Promise<{
        data: {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            workExperience: string;
            education: string;
        };
        message: string;
    } | {
        message: string;
        data?: undefined;
    }>;
}
