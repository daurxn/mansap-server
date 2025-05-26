"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(data) {
        const checkUserExists = await this.prisma.user.findFirst({
            where: { email: data.email },
        });
        if (checkUserExists) {
            throw new common_1.HttpException('User already registered', common_1.HttpStatus.FOUND);
        }
        const hashedPassword = await (0, bcrypt_1.hash)(data.password, 12);
        const userData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            profile: {
                create: {},
            },
        };
        const createUser = await this.prisma.user.create({
            data: userData,
        });
        if (createUser) {
            return {
                statusCode: 200,
                message: 'Register Successful',
            };
        }
    }
    async login(data) {
        const checkUserExists = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (!checkUserExists) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const checkPassword = await (0, bcrypt_1.compare)(data.password, checkUserExists.password);
        if (checkPassword) {
            const accessToken = this.jwtService.sign({
                sub: checkUserExists.id,
                name: checkUserExists.name,
                email: checkUserExists.email,
                role: checkUserExists.role,
            });
            return {
                statusCode: 200,
                message: 'Login berhasil',
                accessToken,
            };
        }
        else {
            throw new common_1.HttpException('User or password not match', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    profile(user_id) {
        return this.prisma.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map