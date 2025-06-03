import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    update(updateProfileDto: UpdateProfileDto, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getProfile(req: AuthenticatedRequest): Promise<{
        name: string | undefined;
        age: number | null | undefined;
        bio: string | null | undefined;
        gender: string | null | undefined;
        location: string | undefined;
    }>;
    createResume(createResumeDto: CreateResumeDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        workExperience: string;
        education: string;
    }>;
    getResume(req: AuthenticatedRequest): Promise<{
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
    createProject(createProjectDto: CreateProjectDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string | null;
        userId: number;
        title: string;
        projectUrl: string | null;
    }>;
    getProjects(req: AuthenticatedRequest): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            imageUrl: string | null;
            userId: number;
            title: string;
            projectUrl: string | null;
        }[];
        message: string;
    }>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        imageUrl: string | null;
        userId: number;
        title: string;
        projectUrl: string | null;
    }>;
    deleteProject(id: number, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
}
