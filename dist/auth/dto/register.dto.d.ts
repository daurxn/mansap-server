import { Role } from '@prisma/client';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
}
