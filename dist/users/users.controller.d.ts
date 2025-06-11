import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserProfile(userId: number): Promise<{
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
    getUserResume(userId: number): Promise<{
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
    getUserProjects(userId: number): Promise<{
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
