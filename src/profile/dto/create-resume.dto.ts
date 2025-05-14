import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10) // Example validation: work experience should not be too short
  workExperience: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5) // Example validation: education details should not be too short
  education: string;
}
