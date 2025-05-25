import { Role } from '../enums/role.enum';

export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: Role.USER,
};

export const AuthService = jest.fn().mockImplementation(() => ({
  register: jest.fn().mockResolvedValue({
    statusCode: 200,
    message: 'Register Successful',
  }),
  login: jest.fn().mockResolvedValue({
    statusCode: 200,
    message: 'Login berhasil',
    accessToken: 'mock-token',
  }),
  profile: jest.fn().mockResolvedValue(mockUser),
}));
