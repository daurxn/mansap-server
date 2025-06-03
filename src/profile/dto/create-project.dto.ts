import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'URL to project image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'URL to the project', required: false })
  @IsOptional()
  @IsString()
  projectUrl?: string;
}
