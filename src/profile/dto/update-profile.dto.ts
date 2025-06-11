// src/profile/dto/update-profile.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'User age. Must be a non-negative integer.',
    example: 30,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'Age must be an integer.' })
  @Min(0, { message: 'Age cannot be negative.' })
  age?: number;

  @ApiPropertyOptional({
    description: 'User gender.',
    example: 'Male',
    maxLength: 50, // Example max length
  })
  @IsOptional()
  @IsString({ message: 'Gender must be a string.' })
  @MaxLength(50, { message: 'Gender cannot exceed 50 characters.' })
  gender?: string;

  @ApiPropertyOptional({
    description: "ID of the user's location. Must be an integer.",
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Location ID must be a number.' }) // Use IsNumber to allow for potential float if not strictly integer, then parse in service
  @IsInt({ message: 'Location ID must be an integer.' }) // Or stick to IsInt if it's always an integer ID
  locationId?: number;

  @ApiPropertyOptional({
    description: "Link or reference to the user's resume.",
    example: 'https://example.com/resume.pdf',
    maxLength: 255, // Example max length for URLs or paths
  })
  @IsOptional()
  @IsString({ message: 'Resume must be a string.' })
  @MaxLength(255, { message: 'Resume cannot exceed 255 characters.' })
  resume?: string;

  @ApiPropertyOptional({
    description: 'Short biography of the user.',
    example: 'Experienced software developer with a passion for AI.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Bio must be a string.' })
  @MaxLength(500, { message: 'Bio cannot exceed 500 characters.' })
  bio?: string;

  @ApiPropertyOptional({
    description: "URL of the user's profile image.",
    example: 'https://example.com/profile.jpg',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Image URL must be a string.' })
  @MaxLength(500, { message: 'Image URL cannot exceed 500 characters.' })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: "URL of the user's profile video.",
    example: 'https://example.com/profile-video.mp4',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Video URL must be a string.' })
  @MaxLength(500, { message: 'Video URL cannot exceed 500 characters.' })
  videoUrl?: string;
}
