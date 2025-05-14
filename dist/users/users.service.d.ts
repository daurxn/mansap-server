import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
