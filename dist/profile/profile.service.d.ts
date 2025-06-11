import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadProfileImage(userId: number, file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
    uploadProfileVideo(userId: number, file: Express.Multer.File): Promise<{
        videoUrl: string;
    }>;
    update(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<{
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
    createResume(userId: number, createResumeDto: CreateResumeDto): Promise<{
        id: number;
        userId: number;
        workExperience: string;
        education: string;
    }>;
    getResume(userId: number): Promise<{
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
    createProject(userId: number, createProjectDto: CreateProjectDto): Promise<{
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
    getProjects(userId: number): Promise<{
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
    getProject(userId: number, projectId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        videoUrl: string | null;
        userId: number;
        title: string;
        description: string;
        projectUrl: string | null;
    } | null>;
    updateProject(userId: number, projectId: number, updateProjectDto: UpdateProjectDto): Promise<{
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
    uploadProjectVideo(userId: number, projectId: number, file: Express.Multer.File): Promise<{
        videoUrl: string;
    }>;
    deleteProject(userId: number, projectId: number): Promise<{
        message: string;
    }>;
}
