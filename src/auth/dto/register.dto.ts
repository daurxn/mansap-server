import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @IsString({ message: 'Name must be a string.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(128, { message: 'Password cannot be longer than 128 characters.' })
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Role must be a valid role (e.g., USER, ADMIN, MODERATOR).',
  })
  role?: Role;
}
