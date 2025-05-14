import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async update(userId: number, updateProfileDto: UpdateProfileDto) {
    await this.prisma.profile.update({
      where: { userId },
      data: updateProfileDto,
    });

    return { message: 'Profile has been updated successfully' };
  }

  getProfile(userId: number) {
    return this.prisma.profile.findFirst({
      where: { userId },
      select: { age: true, bio: true, gender: true, locationId: true },
    });
  }

  async createResume(userId: number, createResumeDto: CreateResumeDto) {
    // 1. Verify the user exists (optional, AuthGuard might make this redundant but good for service integrity)
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // 2. Check if a resume already exists for this user
    // The `userId` in the `Resume` model is unique.
    const existingResume = await this.prisma.resume.findUnique({
      where: { userId },
    });

    if (existingResume) {
      throw new ConflictException(
        `User with ID ${userId} already has a resume. Consider implementing an update endpoint.`,
      );
    }

    // 3. Create the new resume
    return this.prisma.resume.create({
      data: {
        userId,
        workExperience: createResumeDto.workExperience,
        education: createResumeDto.education,
      },
    });
  }

  async getResume(userId: number) {
    const resume = await this.prisma.resume.findUnique({ where: { userId } });

    if (!resume) {
      return null;
    }

    return resume;
  }

  // async getMissingFields(userId: number) {
  //   const profile = await this.prisma.profile.findFirst({ where: { userId } });

  //   if (!profile) {
  //     throw new NotFoundException();
  //   }

  //   return Object.entries(profile).reduce(
  //     (acc, [key, value]) => (value === null ? [...acc, key] : acc),
  //     [],
  //   );
  // }
}
