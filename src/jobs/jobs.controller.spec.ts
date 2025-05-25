import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from '../chat/chat.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Role } from '../auth/enums/role.enum';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

describe('JobsController', () => {
  let controller: JobsController;

  // Mock JobsService
  const mockJobsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPostedById: jest.fn(),
    acceptApplication: jest.fn(),
    getApplications: jest.fn(),
    createApplication: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Mock Guards
  const mockAuthGuard = { canActivate: jest.fn().mockReturnValue(true) };
  const mockRoleGuard = { canActivate: jest.fn().mockReturnValue(true) };

  // Mock authenticated request
  const mockRequest = {
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: Role.USER,
    },
  } as unknown as AuthenticatedRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: mockJobsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: ChatService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<JobsController>(JobsController);

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call jobsService.create with the provided data and user id', async () => {
      // Arrange
      const createJobDto: CreateJobDto = {
        name: 'Software Developer',
        description: 'Job description with minimum length of 10 characters',
        salary: 50000,
        unit: 'HOUR',
        experienceLevel: 'JUNIOR',
        jobType: 'FULL_TIME',
        locationId: 1,
        tags: ['javascript', 'react'],
      };
      const expectedResult = {
        id: 1,
        ...createJobDto,
        postedById: mockRequest.user.id,
      };
      mockJobsService.create.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createJobDto, mockRequest);

      // Assert
      expect(mockJobsService.create).toHaveBeenCalledWith(
        createJobDto,
        mockRequest.user.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call jobsService.findAll with user id and search query', async () => {
      // Arrange
      const search = 'developer';
      const expectedResult = [{ id: 1, name: 'Software Developer' }];
      mockJobsService.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll(mockRequest, search);

      // Assert
      expect(mockJobsService.findAll).toHaveBeenCalledWith(
        mockRequest.user.id,
        search,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should call jobsService.findAll with user id and no search query', async () => {
      // Arrange
      const expectedResult = [
        { id: 1, name: 'Software Developer' },
        { id: 2, name: 'Web Designer' },
      ];
      mockJobsService.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll(mockRequest);

      // Assert
      expect(mockJobsService.findAll).toHaveBeenCalledWith(
        mockRequest.user.id,
        undefined,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findPostedByMe', () => {
    it('should call jobsService.findByPostedById with user id', async () => {
      // Arrange
      const expectedResult = [
        { id: 1, name: 'Software Developer', postedById: mockRequest.user.id },
      ];
      mockJobsService.findByPostedById.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findPostedByMe(mockRequest);

      // Assert
      expect(mockJobsService.findByPostedById).toHaveBeenCalledWith(
        mockRequest.user.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('acceptApplication', () => {
    it('should call jobsService.acceptApplication with user id, job id, and applicant id', async () => {
      // Arrange
      const jobId = 1;
      const applicantId = 2;
      const expectedResult = { success: true, message: 'Application accepted' };
      mockJobsService.acceptApplication.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.acceptApplication(
        mockRequest,
        jobId,
        applicantId,
      );

      // Assert
      expect(mockJobsService.acceptApplication).toHaveBeenCalledWith(
        mockRequest.user.id,
        jobId,
        applicantId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getApplications', () => {
    it('should call jobsService.getApplications with user id', async () => {
      // Arrange
      const expectedResult = [{ id: 1, jobId: 1, applicantId: 2 }];
      mockJobsService.getApplications.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.getApplications(mockRequest);

      // Assert
      expect(mockJobsService.getApplications).toHaveBeenCalledWith(
        mockRequest.user.id,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createApplication', () => {
    it('should call jobsService.createApplication with user id and application data', async () => {
      // Arrange
      const createApplicationDto: CreateApplicationDto = {
        jobId: 1,
        coverLetter: 'Cover letter content',
      };
      const expectedResult = {
        id: 1,
        ...createApplicationDto,
        applicantId: mockRequest.user.id,
      };
      mockJobsService.createApplication.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.createApplication(
        mockRequest,
        createApplicationDto,
      );

      // Assert
      expect(mockJobsService.createApplication).toHaveBeenCalledWith(
        mockRequest.user.id,
        createApplicationDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call jobsService.findOne with user id and job id', async () => {
      // Arrange
      const jobId = '1';
      const expectedResult = { id: 1, name: 'Software Developer' };
      mockJobsService.findOne.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findOne(mockRequest, jobId);

      // Assert
      expect(mockJobsService.findOne).toHaveBeenCalledWith(
        mockRequest.user.id,
        +jobId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call jobsService.update with job id and update data', async () => {
      // Arrange
      const jobId = '1';
      const updateJobDto: UpdateJobDto = {
        name: 'Updated Job Name',
        description: 'Updated description with minimum length of 10 characters',
      };
      const expectedResult = { id: 1, ...updateJobDto };
      mockJobsService.update.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.update(jobId, updateJobDto);

      // Assert
      expect(mockJobsService.update).toHaveBeenCalledWith(+jobId, updateJobDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call jobsService.remove with job id', async () => {
      // Arrange
      const jobId = '1';
      const expectedResult = { id: 1, deleted: true };
      mockJobsService.remove.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.remove(jobId);

      // Assert
      expect(mockJobsService.remove).toHaveBeenCalledWith(+jobId);
      expect(result).toEqual(expectedResult);
    });
  });
});
