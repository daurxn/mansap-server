import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    uploadProfileImage(file: Express.Multer.File, req: AuthenticatedRequest): Promise<{
        imageUrl: string;
    }>;
    uploadProfileVideo(file: Express.Multer.File, req: AuthenticatedRequest): Promise<{
        videoUrl: string;
    }>;
    update(updateProfileDto: UpdateProfileDto, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getProfile(req: AuthenticatedRequest): Promise<{
        name: string | null;
        age: number | null;
        bio: string | null;
        gender: string | null;
        location: string | null;
        imageUrl: string | null;
    }>;
    getAllProfiles(): Promise<{
        id: number;
        userId: number;
        name: string;
        age: number | null;
        bio: string | null;
        gender: string | null;
        location: string | null;
        imageUrl: string | null;
    }[]>;
    createResume(createResumeDto: CreateResumeDto, req: AuthenticatedRequest): Promise<{
        id: number;
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
        imageUrl: string | null;
        videoUrl: string | null;
        userId: number;
        title: string;
        description: string;
        projectUrl: string | null;
    }>;
    getProjects(req: AuthenticatedRequest): Promise<{
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
    uploadProjectVideo(projectId: number, file: Express.Multer.File, req: AuthenticatedRequest): Promise<{
        videoUrl: string;
    }>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto, req: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        videoUrl: string | null;
        userId: number;
        title: string;
        description: string;
        projectUrl: string | null;
    }>;
    deleteProject(id: number, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
}
