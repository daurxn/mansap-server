import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ChatService } from '../chat/chat.service';
export declare class JobsService {
    private prisma;
    private chatService;
    constructor(prisma: PrismaService, chatService: ChatService);
    create(createJobDto: CreateJobDto, postedById: number): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: number, search?: string): Promise<({
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
        postedById: number;
        filledById: number | null;
    } & {
        applied: boolean;
        is_applicable: boolean;
    })[]>;
    findByPostedById(id: number): import(".prisma/client").Prisma.PrismaPromise<({
        location: {
            name: string;
            id: number;
        } | null;
        _count: {
            applications: number;
        };
        tags: {
            name: string;
            id: number;
        }[];
        postedBy: {
            email: string;
            name: string;
        };
    } & {
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
        postedById: number;
        filledById: number | null;
    })[]>;
    findOne(userId: number, id: number): Promise<{
        is_applicable: boolean;
        applied: boolean | null;
        applications?: ({
            resume: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                workExperience: string;
                education: string;
            } | null;
            applicant: {
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
            updatedAt: Date;
            jobId: number;
            coverLetter: string | null;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            applicantId: number;
            resumeId: number | null;
            appliedAt: Date;
        })[] | undefined;
        tags?: {
            name: string;
        }[] | undefined;
        postedBy?: {
            email: string;
            name: string;
            id: number;
        } | undefined;
        name?: string | undefined;
        id?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        locationId?: number | null | undefined;
        description?: string | undefined;
        salary?: import("@prisma/client/runtime/library").Decimal | undefined;
        unit?: import(".prisma/client").$Enums.Unit | undefined;
        experienceLevel?: import(".prisma/client").$Enums.ExperienceLevel | undefined;
        jobType?: import(".prisma/client").$Enums.JobType | undefined;
        postedById?: number | undefined;
        filledById?: number | null | undefined;
    }>;
    update(id: number, updateJobDto: UpdateJobDto): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    createApplication(applicantId: number, createApplicationDto: CreateApplicationDto): Promise<({
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
            postedById: number;
            filledById: number | null;
        };
        resume: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            workExperience: string;
            education: string;
        } | null;
        applicant: {
            email: string;
            name: string;
            id: number;
        };
    } & {
        id: number;
        updatedAt: Date;
        jobId: number;
        coverLetter: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        applicantId: number;
        resumeId: number | null;
        appliedAt: Date;
    }) | undefined>;
    getApplications(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        job: {
            location: {
                name: string;
                id: number;
            } | null;
            _count: {
                applications: number;
            };
            tags: {
                name: string;
                id: number;
            }[];
            postedBy: {
                email: string;
                password: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
            postedById: number;
            filledById: number | null;
        };
    } & {
        id: number;
        updatedAt: Date;
        jobId: number;
        coverLetter: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        applicantId: number;
        resumeId: number | null;
        appliedAt: Date;
    })[]>;
    acceptApplication(userId: number, jobId: number, applicantId: number): Promise<{
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
        postedById: number;
        filledById: number | null;
    }>;
}
