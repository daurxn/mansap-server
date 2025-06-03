import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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

  async getProfile(userId: number) {
    // First get the profile data
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
      select: {
        age: true,
        bio: true,
        gender: true,
        location: { select: { name: true } }, // Select the name from the related location
      },
    });

    // Get the user's name
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    // Combine the data and transform location
    return {
      name: user?.name, // User's name
      age: profile?.age,
      bio: profile?.bio,
      gender: profile?.gender,
      location: profile?.location?.name, // Extract location name string
    };
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
    return resume
      ? { data: resume, message: 'Has resume' }
      : { message: 'No resume' };
  }

  async createProject(userId: number, createProjectDto: CreateProjectDto) {
    // Verify the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Create the new project
    return this.prisma.project.create({
      data: {
        userId,
        title: createProjectDto.title,
        description: createProjectDto.description,
        imageUrl: createProjectDto.imageUrl,
        projectUrl: createProjectDto.projectUrl,
      },
    });
  }

  async getProjects(userId: number) {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return {
      data: projects,
      message: projects.length > 0 ? 'Projects found' : 'No projects',
    };
  }

  async updateProject(
    userId: number,
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    // Check if project exists and belongs to the user
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to user'
      );
    }

    // Update the project
    return this.prisma.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
  }

  async deleteProject(userId: number, projectId: number) {
    // Check if project exists and belongs to the user
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to user'
      );
    }

    // Delete the project
    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return { message: 'Project deleted successfully' };
  }
}
