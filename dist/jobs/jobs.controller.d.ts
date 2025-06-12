import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: AuthenticatedRequest): import(".prisma/client").Prisma.Prisma__JobClient<{
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(req: AuthenticatedRequest, search?: string, locationId?: string): Promise<({
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    } & {
        applied: boolean;
        is_applicable: boolean;
    })[]>;
    findPostedByMe(req: AuthenticatedRequest): import(".prisma/client").Prisma.PrismaPromise<({
        postedBy: {
            name: string;
            email: string;
        };
        tags: {
            id: number;
            name: string;
        }[];
        location: {
            id: number;
            name: string;
        } | null;
        _count: {
            applications: number;
        };
    } & {
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    })[]>;
    acceptApplication(req: AuthenticatedRequest, id: number, applicantId: number): Promise<{
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    }>;
    getApplications(req: AuthenticatedRequest): import(".prisma/client").Prisma.PrismaPromise<({
        job: {
            postedBy: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
            tags: {
                id: number;
                name: string;
            }[];
            location: {
                id: number;
                name: string;
            } | null;
            _count: {
                applications: number;
            };
        } & {
            id: number;
            name: string;
            description: string;
            requirements: string | null;
            responsibilities: string | null;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            createdAt: Date;
            updatedAt: Date;
            postedById: number;
            filledById: number | null;
            locationId: number | null;
        };
    } & {
        id: number;
        updatedAt: Date;
        jobId: number;
        applicantId: number;
        resumeId: number | null;
        coverLetter: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
    })[]>;
    createApplication(req: AuthenticatedRequest, createApplicationDto: CreateApplicationDto): Promise<({
        job: {
            id: number;
            name: string;
            description: string;
            requirements: string | null;
            responsibilities: string | null;
            salary: import("@prisma/client/runtime/library").Decimal;
            unit: import(".prisma/client").$Enums.Unit;
            experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
            jobType: import(".prisma/client").$Enums.JobType;
            applicationDeadline: Date | null;
            isRemote: boolean;
            companyInfo: string | null;
            createdAt: Date;
            updatedAt: Date;
            postedById: number;
            filledById: number | null;
            locationId: number | null;
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
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        updatedAt: Date;
        jobId: number;
        applicantId: number;
        resumeId: number | null;
        coverLetter: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
    }) | undefined>;
    findOne(req: AuthenticatedRequest, id: string): Promise<{
        is_applicable: boolean;
        applied: boolean | null;
        postedBy?: {
            id: number;
            name: string;
            email: string;
        } | undefined;
        tags?: {
            name: string;
        }[] | undefined;
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
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: number;
            updatedAt: Date;
            jobId: number;
            applicantId: number;
            resumeId: number | null;
            coverLetter: string | null;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        })[] | undefined;
        id?: number | undefined;
        name?: string | undefined;
        description?: string | undefined;
        requirements?: string | null | undefined;
        responsibilities?: string | null | undefined;
        salary?: import("@prisma/client/runtime/library").Decimal | undefined;
        unit?: import(".prisma/client").$Enums.Unit | undefined;
        experienceLevel?: import(".prisma/client").$Enums.ExperienceLevel | undefined;
        jobType?: import(".prisma/client").$Enums.JobType | undefined;
        applicationDeadline?: Date | null | undefined;
        isRemote?: boolean | undefined;
        companyInfo?: string | null | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        postedById?: number | undefined;
        filledById?: number | null | undefined;
        locationId?: number | null | undefined;
    }>;
    update(id: string, updateJobDto: UpdateJobDto): import(".prisma/client").Prisma.Prisma__JobClient<{
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__JobClient<{
        id: number;
        name: string;
        description: string;
        requirements: string | null;
        responsibilities: string | null;
        salary: import("@prisma/client/runtime/library").Decimal;
        unit: import(".prisma/client").$Enums.Unit;
        experienceLevel: import(".prisma/client").$Enums.ExperienceLevel;
        jobType: import(".prisma/client").$Enums.JobType;
        applicationDeadline: Date | null;
        isRemote: boolean;
        companyInfo: string | null;
        createdAt: Date;
        updatedAt: Date;
        postedById: number;
        filledById: number | null;
        locationId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
