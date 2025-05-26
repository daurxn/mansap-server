"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.mockUser = void 0;
const role_enum_1 = require("../enums/role.enum");
exports.mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: role_enum_1.Role.USER,
};
exports.AuthService = jest.fn().mockImplementation(() => ({
    register: jest.fn().mockResolvedValue({
        statusCode: 200,
        message: 'Register Successful',
    }),
    login: jest.fn().mockResolvedValue({
        statusCode: 200,
        message: 'Login berhasil',
        accessToken: 'mock-token',
    }),
    profile: jest.fn().mockResolvedValue(exports.mockUser),
}));
//# sourceMappingURL=auth.service.js.map