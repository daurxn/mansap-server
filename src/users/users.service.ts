import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      select: { email: true, name: true },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async getUserProfileById(userId: number): Promise<{
    id: number;
    userId: number;
    name: string;
    age: number | null;
    bio: string | null;
    gender: string | null;
    location: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
  }> {
    // First check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Then get the profile data
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      select: {
        id: true,
        age: true,
        bio: true,
        gender: true,
        locationId: true,
        imageUrl: true,
        videoUrl: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }

    // Get location data if it exists
    let locationName: string | null = null;
    if (profile.locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: profile.locationId },
        select: { name: true },
      });
      locationName = location ? location.name : null;
    }

    return {
      id: profile.id,
      userId: user.id,
      name: user.name,
      age: profile.age,
      bio: profile.bio,
      gender: profile.gender,
      location: locationName,
      imageUrl: profile.imageUrl,
      videoUrl: profile.videoUrl,
    };
  }

  async getUserResumeById(userId: number) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const resume = await this.prisma.resume.findUnique({ 
      where: { userId } 
    });
    
    return resume
      ? { data: resume, message: 'Resume found' }
      : { message: 'No resume available' };
  }

  async getUserProjectsById(userId: number) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const projects = await this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return {
      data: projects,
      message: projects.length > 0 ? 'Projects found' : 'No projects available',
    };
  }
}
