import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        statusCode: number;
        message: string;
    } | undefined>;
    login(data: LoginDto): Promise<{
        statusCode: number;
        message: string;
        accessToken: string;
    }>;
    profile(user_id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
