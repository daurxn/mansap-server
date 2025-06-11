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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findOne(email) {
        return this.prisma.user.findFirst({
            where: { email },
            select: { email: true, name: true },
        });
    }
    findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, role: true },
        });
    }
    async getUserProfileById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
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
            throw new common_1.NotFoundException(`Profile for user ${userId} not found`);
        }
        let locationName = null;
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
    async getUserResumeById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const resume = await this.prisma.resume.findUnique({
            where: { userId }
        });
        return resume
            ? { data: resume, message: 'Resume found' }
            : { message: 'No resume available' };
    }
    async getUserProjectsById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map