import { ExperienceLevel, JobType, Unit } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ArrayMinSize,
} from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty({ message: 'Job name should not be empty.' })
  @IsString({ message: 'Job name must be a string.' })
  @MinLength(3, { message: 'Job name must be at least 3 characters long.' })
  @MaxLength(100, { message: 'Job name cannot be longer than 100 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Description should not be empty.' })
  @IsString({ message: 'Description must be a string.' })
  @MinLength(10, {
    message: 'Description must be at least 10 characters long.',
  })
  @MaxLength(5000, {
    message: 'Description cannot be longer than 5000 characters.',
  })
  description: string;

  @IsNotEmpty({ message: 'Salary should not be empty.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 },
    { message: 'Salary must be a valid number with up to two decimal places.' },
  )
  @IsPositive({ message: 'Salary must be a positive number.' })
  salary: number;

  @IsNotEmpty({ message: 'Unit for salary should not be empty.' })
  @IsEnum(Unit, {
    message: 'Invalid unit. Must be one of: HOUR, DAY, PROJECT.',
  })
  unit: Unit;

  @IsNotEmpty({ message: 'Experience level should not be empty.' })
  @IsEnum(ExperienceLevel, {
    message: 'Invalid experience level. Must be one of: JUNIOR, MID, SENIOR.',
  })
  experienceLevel: ExperienceLevel;

  @IsNotEmpty({ message: 'Job type should not be empty.' })
  @IsEnum(JobType, {
    message:
      'Invalid job type. Must be one of: FULL_TIME, PART_TIME, CONTRACT.',
  })
  jobType: JobType;

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
}
