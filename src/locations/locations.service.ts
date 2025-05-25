import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({ data: createLocationDto });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
