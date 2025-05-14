import { Request as ExpressRequest } from 'express';
import { Role } from '../enums/role.enum';
export interface AuthenticatedUser {
    id: number;
    name: string;
    email: string;
    role: Role;
}
export interface AuthenticatedRequest extends ExpressRequest {
    user: AuthenticatedUser;
}
