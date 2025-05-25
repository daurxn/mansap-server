import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from '../chat/chat.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ExperienceLevel, JobType, Unit } from '@prisma/client';

describe('JobsService', () => {
  let service: JobsService;

  // Mock PrismaService
  const mockPrismaService = {
    job: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    application: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    resume: {
      findUnique: jest.fn(),
    },
  };

  // Mock ChatService
  const mockChatService = {
    create: jest.fn(),
    findOneByJob: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ChatService,
          useValue: mockChatService,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new job with the provided data', async () => {
      // Arrange
      const createJobDto: CreateJobDto = {
        name: 'Software Developer',
        description: 'Develop software applications',
        salary: 100000,
        unit: Unit.HOUR,
        experienceLevel: ExperienceLevel.MID,
        jobType: JobType.FULL_TIME,
        locationId: 1,
        tags: ['javascript', 'react'],
      };
      const postedById = 1;
      const expectedJob = { id: 1, ...createJobDto, postedById };

      mockPrismaService.job.create.mockResolvedValue(expectedJob);

      // Act
      const result = await service.create(createJobDto, postedById);

      // Assert
      expect(mockPrismaService.job.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ...createJobDto,
          postedById,
          tags: {
            connectOrCreate: expect.any(Array),
          },
        }),
      });
      expect(result).toEqual(expectedJob);
    });
  });

  describe('findAll', () => {
    it('should return all jobs with applied and is_applicable flags', async () => {
      // Arrange
      const userId = 1;
      const search = 'developer';
      const jobs = [
        { id: 1, name: 'Software Developer', postedById: 2 },
        { id: 2, name: 'Web Developer', postedById: 3 },
      ];

      mockPrismaService.job.findMany.mockResolvedValue(jobs);
      mockPrismaService.application.findMany.mockResolvedValueOnce([]);
      mockPrismaService.application.findMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.findAll(userId, search);

      // Assert
      expect(mockPrismaService.job.findMany).toHaveBeenCalledWith({
        where: {
          OR: expect.any(Array),
        },
        include: expect.any(Object),
      });
      expect(result).toEqual([
        { ...jobs[0], applied: false, is_applicable: true },
        { ...jobs[1], applied: false, is_applicable: true },
      ]);
    });

    it('should mark jobs as applied when user has applied', async () => {
      // Arrange
      const userId = 1;
      const jobs = [
        { id: 1, name: 'Software Developer', postedById: 2 },
      ];

      mockPrismaService.job.findMany.mockResolvedValue(jobs);
      mockPrismaService.application.findMany.mockResolvedValueOnce([
        { jobId: 1, applicantId: userId },
      ]);

      // Act
      const result = await service.findAll(userId);

      // Assert
      expect(result).toEqual([
        { ...jobs[0], applied: true, is_applicable: true },
      ]);
    });

    it('should mark jobs as not applicable when user is the poster', async () => {
      // Arrange
      const userId = 2;
      const jobs = [
        { id: 1, name: 'Software Developer', postedById: userId },
      ];

      mockPrismaService.job.findMany.mockResolvedValue(jobs);
      mockPrismaService.application.findMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.findAll(userId);

      // Assert
      expect(result).toEqual([
        { ...jobs[0], applied: false, is_applicable: false },
      ]);
    });
  });

  describe('findByPostedById', () => {
    it('should return all jobs posted by the specified user', async () => {
      // Arrange
      const userId = 1;
      const expectedJobs = [
        { id: 1, name: 'Software Developer', postedById: userId },
        { id: 2, name: 'Web Developer', postedById: userId },
      ];

      mockPrismaService.job.findMany.mockResolvedValue(expectedJobs);

      // Act
      const result = await service.findByPostedById(userId);

      // Assert
      expect(mockPrismaService.job.findMany).toHaveBeenCalledWith({
        where: { postedById: userId },
        include: expect.any(Object),
      });
      expect(result).toEqual(expectedJobs);
    });
  });

  describe('findOne', () => {
    it('should return a job with applied and is_applicable flags', async () => {
      // Arrange
      const userId = 1;
      const jobId = 2;
      const job = {
        id: jobId,
        name: 'Software Developer',
        postedById: 3,
      };

      mockPrismaService.job.findFirst.mockResolvedValue(job);
      mockPrismaService.application.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findOne(userId, jobId);

      // Assert
      expect(mockPrismaService.job.findFirst).toHaveBeenCalledWith({
        where: { id: jobId },
        include: expect.any(Object),
      });
      expect(result).toEqual({
        ...job,
        applied: false,
        is_applicable: true,
      });
    });

    it('should mark job as applied when user has applied', async () => {
      // Arrange
      const userId = 1;
      const jobId = 2;
      const job = {
        id: jobId,
        name: 'Software Developer',
        postedById: 3,
      };

      mockPrismaService.job.findFirst.mockResolvedValue(job);
      mockPrismaService.application.findMany.mockResolvedValue([
        { job: { id: jobId } },
      ]);

      // Act
      const result = await service.findOne(userId, jobId);

      // Assert
      expect(result).toEqual({
        ...job,
        applied: true,
        is_applicable: true,
      });
    });

    it('should mark job as not applicable when user is the poster', async () => {
      // Arrange
      const userId = 3;
      const jobId = 2;
      const job = {
        id: jobId,
        name: 'Software Developer',
        postedById: userId,
      };

      mockPrismaService.job.findFirst.mockResolvedValue(job);
      mockPrismaService.application.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findOne(userId, jobId);

      // Assert
      expect(result).toEqual({
        ...job,
        applied: false,
        is_applicable: false,
      });
    });
  });

  describe('update', () => {
    it('should update a job with the provided data', async () => {
      // Arrange
      const jobId = 1;
      const updateJobDto: UpdateJobDto = {
        name: 'Updated Job Name',
        description: 'Updated job description',
        tags: ['javascript', 'react'],
      };
      const expectedJob = { id: jobId, ...updateJobDto };

      mockPrismaService.job.update.mockResolvedValue(expectedJob);

      // Act
      const result = await service.update(jobId, updateJobDto);

      // Assert
      expect(mockPrismaService.job.update).toHaveBeenCalledWith({
        where: { id: jobId },
        data: expect.objectContaining({
          ...updateJobDto,
          tags: {
            connectOrCreate: expect.any(Array),
          },
        }),
      });
      expect(result).toEqual(expectedJob);
    });
  });

  describe('remove', () => {
    it('should delete a job with the specified id', async () => {
      // Arrange
      const jobId = 1;
      const expectedResult = { id: jobId, deleted: true };

      mockPrismaService.job.delete.mockResolvedValue(expectedResult);

      // Act
      const result = await service.remove(jobId);

      // Assert
      expect(mockPrismaService.job.delete).toHaveBeenCalledWith({
        where: { id: jobId },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createApplication', () => {
    it('should create a job application', async () => {
      // Arrange
      const applicantId = 1;
      const createApplicationDto: CreateApplicationDto = {
        jobId: 2,
        coverLetter: 'I am interested in this job',
      };
      const applicant = { id: applicantId, name: 'John Doe' };
      const job = { id: createApplicationDto.jobId, name: 'Software Developer' };
      const resume = { id: 3, userId: applicantId };
      const expectedApplication = {
        id: 1,
        ...createApplicationDto,
        applicantId,
        resumeId: resume.id,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(applicant);
      mockPrismaService.job.findUnique.mockResolvedValue(job);
      mockPrismaService.application.findFirst.mockResolvedValue(null);
      mockPrismaService.resume.findUnique.mockResolvedValue(resume);
      mockPrismaService.application.create.mockResolvedValue(expectedApplication);

      // Act
      const result = await service.createApplication(applicantId, createApplicationDto);

      // Assert
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: applicantId },
      });
      expect(mockPrismaService.job.findUnique).toHaveBeenCalledWith({
        where: { id: createApplicationDto.jobId },
      });
      expect(mockPrismaService.application.findFirst).toHaveBeenCalledWith({
        where: {
          applicantId,
          jobId: createApplicationDto.jobId,
        },
      });
      expect(mockPrismaService.resume.findUnique).toHaveBeenCalledWith({
        where: { userId: applicantId },
      });
      expect(mockPrismaService.application.create).toHaveBeenCalledWith({
        data: {
          jobId: createApplicationDto.jobId,
          applicantId,
          resumeId: resume.id,
          coverLetter: createApplicationDto.coverLetter,
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(expectedApplication);
    });

    it('should throw NotFoundException when applicant not found', async () => {
      // Arrange
      const applicantId = 1;
      const createApplicationDto: CreateApplicationDto = {
        jobId: 2,
        coverLetter: 'I am interested in this job',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.createApplication(applicantId, createApplicationDto))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when job not found', async () => {
      // Arrange
      const applicantId = 1;
      const createApplicationDto: CreateApplicationDto = {
        jobId: 2,
        coverLetter: 'I am interested in this job',
      };
      const applicant = { id: applicantId, name: 'John Doe' };

      mockPrismaService.user.findUnique.mockResolvedValue(applicant);
      mockPrismaService.job.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.createApplication(applicantId, createApplicationDto))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when application already exists', async () => {
      // Arrange
      const applicantId = 1;
      const createApplicationDto: CreateApplicationDto = {
        jobId: 2,
        coverLetter: 'I am interested in this job',
      };
      const applicant = { id: applicantId, name: 'John Doe' };
      const job = { id: createApplicationDto.jobId, name: 'Software Developer' };
      const existingApplication = {
        id: 1,
        jobId: createApplicationDto.jobId,
        applicantId,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(applicant);
      mockPrismaService.job.findUnique.mockResolvedValue(job);
      mockPrismaService.application.findFirst.mockResolvedValue(existingApplication);

      // Act & Assert
      await expect(service.createApplication(applicantId, createApplicationDto))
        .rejects.toThrow(ConflictException);
    });
  });

  describe('getApplications', () => {
    it('should return all applications for the specified user', async () => {
      // Arrange
      const userId = 1;
      const expectedApplications = [
        {
          id: 1,
          jobId: 2,
          applicantId: userId,
          job: { name: 'Software Developer' },
        },
      ];

      mockPrismaService.application.findMany.mockResolvedValue(expectedApplications);

      // Act
      const result = await service.getApplications(userId);

      // Assert
      expect(mockPrismaService.application.findMany).toHaveBeenCalledWith({
        where: { applicantId: userId },
        include: expect.any(Object),
      });
      expect(result).toEqual(expectedApplications);
    });
  });

  describe('acceptApplication', () => {
    it('should accept an application and create a chat', async () => {
      // Arrange
      const userId = 1;
      const jobId = 2;
      const applicantId = 3;
      const job = { id: jobId, postedById: userId };
      const application = { id: 4, jobId, applicantId };
      const updatedJob = { ...job, filledById: applicantId };

      mockPrismaService.job.findFirst.mockResolvedValue(job);
      mockPrismaService.application.findFirst.mockResolvedValue(application);
      mockPrismaService.job.update.mockResolvedValue(updatedJob);

      // Act
      const result = await service.acceptApplication(userId, jobId, applicantId);

      // Assert
      expect(mockPrismaService.job.findFirst).toHaveBeenCalledWith({
        where: {
          id: jobId,
          postedById: userId,
        },
      });
      expect(mockPrismaService.application.findFirst).toHaveBeenCalledWith({
        where: {
          jobId,
          applicantId,
        },
      });
      expect(mockPrismaService.job.update).toHaveBeenCalledWith({
        where: { id: jobId },
        data: { filledById: applicantId },
      });
      expect(mockChatService.create).toHaveBeenCalledWith({
        participantIds: [userId, applicantId],
        jobId,
      });
      expect(result).toEqual(updatedJob);
    });

    it('should throw NotFoundException when job not found or user is not the poster', async () => {
      // Arrange
      const userId = 1;
      const jobId = 2;
      const applicantId = 3;

      mockPrismaService.job.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.acceptApplication(userId, jobId, applicantId))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when application not found', async () => {
      // Arrange
      const userId = 1;
      const jobId = 2;
      const applicantId = 3;
      const job = { id: jobId, postedById: userId };

      mockPrismaService.job.findFirst.mockResolvedValue(job);
      mockPrismaService.application.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.acceptApplication(userId, jobId, applicantId))
        .rejects.toThrow(NotFoundException);
    });
  });
});
