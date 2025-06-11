import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: AuthenticatedRequest): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(req: AuthenticatedRequest, search?: string): Promise<({
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    } & {
        applied: boolean;
        is_applicable: boolean;
    })[]>;
    findPostedByMe(req: AuthenticatedRequest): import(".prisma/client").Prisma.PrismaPromise<({
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
            name: string;
            email: string;
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    })[]>;
    acceptApplication(req: AuthenticatedRequest, id: number, applicantId: number): Promise<{
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    }>;
    getApplications(req: AuthenticatedRequest): import(".prisma/client").Prisma.PrismaPromise<({
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
                name: string;
                email: string;
                password: string;
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
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            postedById: number;
            filledById: number | null;
        };
    } & {
        id: number;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        applicantId: number;
        resumeId: number | null;
        coverLetter: string | null;
        appliedAt: Date;
    })[]>;
    createApplication(req: AuthenticatedRequest, createApplicationDto: CreateApplicationDto): Promise<({
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
            requirements: string | null;
            responsibilities: string | null;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
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
            name: string;
            email: string;
            id: number;
        };
    } & {
        id: number;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        applicantId: number;
        resumeId: number | null;
        coverLetter: string | null;
        appliedAt: Date;
    }) | undefined>;
    findOne(req: AuthenticatedRequest, id: string): Promise<{
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
                name: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            jobId: number;
            applicantId: number;
            resumeId: number | null;
            coverLetter: string | null;
            appliedAt: Date;
        })[] | undefined;
        tags?: {
            name: string;
        }[] | undefined;
        postedBy?: {
            name: string;
            email: string;
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
        requirements?: string | null | undefined;
        responsibilities?: string | null | undefined;
        applicationDeadline?: Date | null | undefined;
        isRemote?: boolean | undefined;
        companyInfo?: string | null | undefined;
        postedById?: number | undefined;
        filledById?: number | null | undefined;
    }>;
    update(id: string, updateJobDto: UpdateJobDto): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__JobClient<{
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
        requirements: string | null;
        responsibilities: string | null;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        postedById: number;
        filledById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
