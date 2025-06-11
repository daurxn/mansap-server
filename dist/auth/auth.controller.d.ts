import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(data: RegisterDto): Promise<{
        statusCode: number;
        message: string;
    } | undefined>;
    login(data: LoginDto): Promise<{
        statusCode: number;
        message: string;
        accessToken: string;
    }>;
    profile(req: AuthenticatedRequest): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    adminOnlyEndpoint(): string;
}
