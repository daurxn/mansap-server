import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Job } from '@prisma/client';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  create(createJobDto: CreateJobDto, postedById: number) {
    const newJob = {
      ...createJobDto,
      postedById,
      tags: {
        connectOrCreate: createJobDto.tags?.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    };

    return this.prisma.job.create({ data: newJob });
  }

  async findAll(userId: number, search?: string) {
    // build dynamic where clauses
    const where: Record<string, any> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        {
          tags: {
            some: { name: { contains: search, mode: 'insensitive' } },
          },
        },
      ];
    }

    const jobs = await this.prisma.job.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          {
            tags: {
              some: { name: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      },
      include: {
        postedBy: { select: { email: true, name: true } },
        tags: { select: { name: true } },
        _count: {
          select: {
            applications: true,
          },
        },
        location: true,
      },
    });

    const result: (Job & { applied: boolean; is_applicable: boolean })[] = [];

    for (const job of jobs) {
      const applications = await this.prisma.application.findMany({
        where: { jobId: job.id },
      });

      result.push({
        ...job,
        applied: applications.some((app) => app.applicantId === userId),
        is_applicable: job.postedById !== userId,
      });
    }

    return result;
  }

  findByPostedById(id: number) {
    return this.prisma.job.findMany({
      where: { postedById: id },
      include: {
        postedBy: { select: { email: true, name: true } },
        tags: true,
        location: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });
  }

  async findOne(userId: number, id: number) {
    const job = await this.prisma.job.findFirst({
      where: { id: id },
      include: {
        postedBy: { select: { email: true, name: true, id: true } },
        tags: { select: { name: true } },
        applications: { include: { applicant: true, resume: true } },
      },
    });

    const jobs = await this.prisma.application.findMany({
      select: { job: { select: { id: true } } },
    });

    const applied = job && jobs.some((j) => j.job.id === job.id);

    const is_applicable = job?.postedById !== userId;

    return { ...job, is_applicable, applied };
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    const updatedJob = {
      ...updateJobDto,
      tags: {
        connectOrCreate: updateJobDto.tags?.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    };

    return this.prisma.job.update({ where: { id }, data: updatedJob });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }

  async createApplication(
    applicantId: number,
    createApplicationDto: CreateApplicationDto,
  ) {
    const { jobId, coverLetter } = createApplicationDto;

    const applicant = await this.prisma.user.findUnique({
      where: { id: applicantId },
    });

    console.log(applicant, jobId, coverLetter);

    if (!applicant) {
      throw new NotFoundException(
        `Applicant with ID ${applicantId} not found.`,
      );
    }

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found.`);
    }

    console.log(1);

    const existingApplication = await this.prisma.application.findFirst({
      where: {
        applicantId: applicantId,
        jobId,
      },
    });

    if (existingApplication) {
      throw new ConflictException(
        `You have already applied for job ID ${jobId}.`,
      );
    }

    console.log(2);

    const resume = await this.prisma.resume.findUnique({
      where: { userId: applicantId },
    });

    if (resume) {
      console.log(resume, job, applicant);

      try {
        const newApplication = await this.prisma.application.create({
          data: {
            jobId,
            applicantId,
            resumeId: resume.id,
            coverLetter,
          },
          include: {
            job: true,
            applicant: {
              select: { id: true, name: true, email: true },
            },
            resume: true,
          },
        });
        return newApplication;
      } catch (error) {
        // Log the error for debugging
        console.error('Error creating application:', error);
        // Handle potential Prisma errors, e.g., foreign key constraint violations
        // if connect fails for some unexpected reason (though checks above should prevent this)
        throw new ConflictException(
          'Could not create application. Please ensure all provided IDs are valid and try again.',
        );
      }
    }
  }

  getApplications(userId: number) {
    return this.prisma.application.findMany({
      where: { applicantId: userId },
      include: {
        job: {
          include: {
            location: true,
            tags: true,
            postedBy: true,
            _count: {
              select: {
                applications: true,
              },
            },
          },
        },
      },
    });
  }

  async acceptApplication(userId: number, jobId: number, applicantId: number) {
    const job = await this.prisma.job.findFirst({
      where: {
        id: jobId,
        postedById: userId,
      },
    });

    if (!job) {
      throw new NotFoundException(
        'Job not found or you are not the job poster',
      );
    }

    // Verify that the application exists
    const application = await this.prisma.application.findFirst({
      where: {
        jobId,
        applicantId,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Update the job with the selected applicant
    const updatedJob = await this.prisma.job.update({
      where: { id: jobId },
      data: { filledById: applicantId },
    });

    // Create a chat between the job poster and the selected applicant
    await this.chatService.create({
      participantIds: [userId, applicantId],
      jobId,
    });

    return updatedJob;
  }
}
