import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    update(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<{
        name: string | undefined;
        age: number | null | undefined;
        bio: string | null | undefined;
        gender: string | null | undefined;
        location: string | undefined;
    }>;
    createResume(userId: number, createResumeDto: CreateResumeDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
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
        userId: number;
        title: string;
        description: string;
        imageUrl: string | null;
        projectUrl: string | null;
    }>;
    getProjects(userId: number): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            title: string;
            description: string;
            imageUrl: string | null;
            projectUrl: string | null;
        }[];
        message: string;
    }>;
    updateProject(userId: number, projectId: number, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string;
        imageUrl: string | null;
        projectUrl: string | null;
    }>;
    deleteProject(userId: number, projectId: number): Promise<{
        message: string;
    }>;
}
