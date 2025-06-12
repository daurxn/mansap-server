import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { supabaseClient, CHAT_IMAGES_BUCKET } from '../config/supabase.config';
import { Express } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadProfileImage(
    userId: number,
    file: Express.Multer.File,
  ): Promise<{ imageUrl: string }> {
    try {
      if (!file || !file.originalname || !file.buffer) {
        throw new BadRequestException('Invalid file upload');
      }

      // Check file type
      if (!file.mimetype.includes('image/')) {
        throw new BadRequestException('Only image files are allowed');
      }

      // Generate a unique filename
      const fileExt = file.originalname.split('.').pop();
      const fileName = `profiles/${userId}/${uuidv4()}.${fileExt}`;

      // Upload to Supabase
      const { error } = await supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
        });

      if (error) {
        throw new BadRequestException(
          `Failed to upload image: ${error.message}`,
        );
      }

      // Get public URL
      const { data: publicUrlData } = supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .getPublicUrl(fileName);

      return { imageUrl: publicUrlData.publicUrl };
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new BadRequestException(
        error.message || 'Failed to upload profile image',
      );
    }
  }

  async uploadProfileVideo(
    userId: number,
    file: Express.Multer.File,
  ): Promise<{ videoUrl: string }> {
    try {
      if (!file || !file.originalname || !file.buffer) {
        throw new BadRequestException('Invalid file upload');
      }

      // Validate that the file is a video
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (!validVideoTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Invalid video format. Supported formats are MP4, WebM, and OGG.',
        );
      }

      // Generate a unique filename
      const fileExt = file.originalname.split('.').pop();
      const fileName = `profiles/${userId}/video-${uuidv4()}.${fileExt}`;

      // Upload to Supabase
      const { error } = await supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
        });

      if (error) {
        throw new BadRequestException(
          `Failed to upload video: ${error.message}`,
        );
      }

      // Get public URL
      const { data: publicUrlData } = supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .getPublicUrl(fileName);

      const videoUrl = publicUrlData.publicUrl;

      // Update the user's profile with the video URL
      await this.prisma.profile.update({
        where: { userId },
        data: { videoUrl },
      });

      return { videoUrl };
    } catch (error: any) {
      console.error('Error uploading video:', error);
      throw new BadRequestException(
        error.message || 'Failed to upload profile video',
      );
    }
  }

  async update(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    // Now we can directly use the imageUrl and videoUrl fields from updateProfileDto
    await this.prisma.profile.update({
      where: { userId },
      data: updateProfileDto,
    });

    return { message: 'Profile has been updated successfully' };
  }

  async getProfile(userId: number): Promise<{
    name: string | null;
    age: number | null;
    bio: string | null;
    gender: string | null;
    location: string | null;
    imageUrl: string | null;
  }> {
    // First get the profile data
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      select: {
        age: true,
        bio: true,
        gender: true,
        locationId: true,
        imageUrl: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    let locationName: string | null = null;
    if (profile.locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: profile.locationId },
        select: { name: true },
      });
      locationName = location ? location.name : null;
    }

    return {
      name: user?.name || null, // User's name
      age: profile.age,
      bio: profile.bio,
      gender: profile.gender,
      location: locationName,
      imageUrl: profile.imageUrl,
    };
  }

  async getAllProfiles(): Promise<
    {
      id: number;
      userId: number;
      name: string;
      age: number | null;
      bio: string | null;
      gender: string | null;
      location: string | null;
      imageUrl: string | null;
    }[]
  > {
    // Fetch all profiles with their associated users
    const profiles = await this.prisma.profile.findMany({
      select: {
        id: true,
        age: true,
        bio: true,
        gender: true,
        locationId: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Fetch locations for profiles with locationId
    const profilesWithLocation = await Promise.all(
      profiles.map(async (profile) => {
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
          userId: profile.user.id,
          name: profile.user.name,
          age: profile.age,
          bio: profile.bio,
          gender: profile.gender,
          location: locationName,
          imageUrl: profile.imageUrl,
        };
      }),
    );

    return profilesWithLocation;
  }

  async createResume(
    userId: number,
    createResumeDto: CreateResumeDto,
  ): Promise<{
    id: number;
    userId: number;
    workExperience: string;
    education: string;
  }> {
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

  public async getProject(userId: number, projectId: number) {
    return await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });
  }

  public async updateProject(
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
        'Project not found or does not belong to user',
      );
    }

    // Update the project
    return this.prisma.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
  }

  async uploadProjectVideo(
    userId: number,
    projectId: number,
    file: Express.Multer.File,
  ): Promise<{ videoUrl: string }> {
    try {
      // Check if project exists and belongs to the user
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

      if (!project) {
        throw new NotFoundException(
          'Project not found or does not belong to user',
        );
      }

      if (!file || !file.originalname || !file.buffer) {
        throw new BadRequestException('Invalid file upload');
      }

      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (!validVideoTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Invalid video format. Supported formats are MP4, WebM, and OGG.',
        );
      }

      // Max size: 100MB
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('Video file too large. Maximum size is 100MB.');
      }

      // Generate a unique filename
      const fileExt = file.originalname.split('.').pop();
      const fileName = `projects/${projectId}/video-${uuidv4()}.${fileExt}`;

      // Upload to Supabase
      const { error } = await supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
        });

      if (error) {
        throw new BadRequestException(
          `Failed to upload video: ${error.message}`,
        );
      }

      // Get public URL
      const { data: publicUrlData } = supabaseClient.storage
        .from(CHAT_IMAGES_BUCKET)
        .getPublicUrl(fileName);

      const videoUrl = publicUrlData.publicUrl;

      // Update project with video URL
      await this.prisma.project.update({
        where: { id: projectId },
        data: { videoUrl },
      });

      return { videoUrl };
    } catch (error: any) {
      console.error('Error uploading project video:', error);
      throw new BadRequestException(
        error.message || 'Failed to upload project video',
      );
    }
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
        'Project not found or does not belong to user',
      );
    }

    // Delete the project
    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return { message: 'Project deleted successfully' };
  }
}
