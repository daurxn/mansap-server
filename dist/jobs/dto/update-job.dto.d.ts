import { ExperienceLevel, JobType, Unit } from '@prisma/client';
export declare class UpdateJobDto {
    name?: string;
    description?: string;
    salary?: number;
    unit?: Unit;
    experienceLevel?: ExperienceLevel;
    jobType?: JobType;
    locationId?: number;
    tags?: string[];
}
