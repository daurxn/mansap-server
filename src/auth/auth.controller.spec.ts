import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;

  // Mock data
  const mockRegisterDto: RegisterDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: Role.USER,
  };

  // Mock AuthService
  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    profile: jest.fn(),
  };

  // Mock Guards
  const mockAuthGuard = { canActivate: jest.fn().mockReturnValue(true) };
  const mockRoleGuard = { canActivate: jest.fn().mockReturnValue(true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test suite for register method
  describe('register', () => {
    it('should call authService.register with the provided data', async () => {
      const expectedResult = {
        statusCode: 200,
        message: 'Register Successful',
      };
      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(mockRegisterDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRegisterDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from the service', async () => {
      const error = new HttpException(
        'User already registered',
        HttpStatus.FOUND,
      );
      mockAuthService.register.mockRejectedValue(error);

      await expect(controller.register(mockRegisterDto)).rejects.toThrow(error);
    });
  });

  // Test suite for login method
  describe('login', () => {
    it('should call authService.login with the provided credentials', async () => {
      const expectedResult = {
        statusCode: 200,
        message: 'Login berhasil',
        accessToken: 'mock-token',
      };
      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(mockLoginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from the service', async () => {
      const error = new HttpException('User not found', HttpStatus.NOT_FOUND);
      mockAuthService.login.mockRejectedValue(error);

      await expect(controller.login(mockLoginDto)).rejects.toThrow(error);
    });
  });

  // Test suite for profile method
  describe('profile', () => {
    it('should call authService.profile with the user id from the request', async () => {
      const mockRequest = {
        user: mockUser,
      } as AuthenticatedRequest;

      mockAuthService.profile.mockResolvedValue(mockUser);

      const result = await controller.profile(mockRequest);

      expect(mockAuthService.profile).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  // Test suite for adminOnlyEndpoint method
  describe('adminOnlyEndpoint', () => {
    it('should return welcome message when authorized', () => {
      const result = controller.adminOnlyEndpoint();
      expect(result).toBe('Welcome admin');
    });
  });

  // Note: Based on the memory provided, we're not testing guard behavior directly with expect().toThrow() assertions
  // This is because in NestJS, when a guard's canActivate method throws an HttpException (e.g., ForbiddenException),
  // expect(() => controller.method()).toThrow(SpecificException) often fails with 'Received function did not throw'.
  // This happens because NestJS's testing environment and exception filters handle the exception from the guard
  // before it's seen as being thrown by the controller method itself.
  //
  // Instead, we're focusing on testing the controller's functionality and verifying that it correctly calls
  // the service methods, which is a more reliable approach for unit testing NestJS controllers with guards.
});
