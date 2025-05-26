import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLocationDto: CreateLocationDto): import(".prisma/client").Prisma.Prisma__LocationClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
