import { ExperienceLevel, JobType, Unit } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ArrayMinSize,
} from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString({ message: 'Job name must be a string.' })
  @MinLength(3, { message: 'Job name must be at least 3 characters long.' })
  @MaxLength(100, { message: 'Job name cannot be longer than 100 characters.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @MinLength(10, {
    message: 'Description must be at least 10 characters long.',
  })
  @MaxLength(5000, {
    message: 'Description cannot be longer than 5000 characters.',
  })
  description?: string;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 },
    { message: 'Salary must be a valid number with up to two decimal places.' },
  )
  @IsPositive({ message: 'Salary must be a positive number.' })
  salary?: number;

  @IsOptional()
  @IsEnum(Unit, {
    message: 'Invalid unit. Must be one of: HOUR, DAY, PROJECT.',
  })
  unit?: Unit;

  @IsOptional()
  @IsEnum(ExperienceLevel, {
    message: 'Invalid experience level. Must be one of: JUNIOR, MID, SENIOR.',
  })
  experienceLevel?: ExperienceLevel;

  @IsOptional()
  @IsEnum(JobType, {
    message:
      'Invalid job type. Must be one of: FULL_TIME, PART_TIME, CONTRACT.',
  })
  jobType?: JobType;

  @IsOptional()
  @IsInt({ message: 'Location ID must be an integer.' })
  @IsPositive({ message: 'Location ID must be a positive number.' })
  locationId?: number;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array of strings.' })
  @IsString({ each: true, message: 'Each tag must be a string.' })
  @ArrayMinSize(1, {
    message: 'If tags are provided, there must be at least one tag.',
  })
  @MinLength(2, {
    each: true,
    message: 'Each tag must be at least 2 characters long.',
  })
  @MaxLength(50, {
    each: true,
    message: 'Each tag cannot be longer than 50 characters.',
  })
  tags?: string[];

  @IsOptional()
  @IsString({ message: 'Requirements must be a string.' })
  @MaxLength(5000, {
    message: 'Requirements cannot be longer than 5000 characters.',
  })
  requirements?: string;

  @IsOptional()
  @IsString({ message: 'Responsibilities must be a string.' })
  @MaxLength(5000, {
    message: 'Responsibilities cannot be longer than 5000 characters.',
  })
  responsibilities?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Application deadline must be a valid date.' })
  applicationDeadline?: string;

  @IsOptional()
  @IsBoolean({ message: 'Remote work option must be a boolean.' })
  isRemote?: boolean;

  @IsOptional()
  @IsString({ message: 'Company information must be a string.' })
  @MaxLength(2000, {
    message: 'Company information cannot be longer than 2000 characters.',
  })
  companyInfo?: string;
}
