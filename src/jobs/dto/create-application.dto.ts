import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateApplicationDto {
  @IsInt({ message: 'Job ID must be an integer.' })
  @IsNotEmpty({ message: 'Job ID is required.' })
  @Min(1, { message: 'Job ID must be a positive number.' })
  jobId: number;

  @IsOptional()
  @IsString({ message: 'Cover letter must be a string.' })
  @MaxLength(5000, {
    message: 'Cover letter cannot be longer than 5000 characters.',
  })
  coverLetter?: string;
}
