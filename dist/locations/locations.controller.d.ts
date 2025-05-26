import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto): import(".prisma/client").Prisma.Prisma__LocationClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
