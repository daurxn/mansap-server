import { ExperienceLevel, JobType, Unit } from '@prisma/client';
export declare class CreateJobDto {
    name: string;
    description: string;
    salary: number;
    unit: Unit;
    experienceLevel: ExperienceLevel;
    jobType: JobType;
    locationId?: number;
    tags?: string[];
}
