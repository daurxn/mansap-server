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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async update(userId, updateProfileDto) {
        await this.prisma.profile.update({
            where: { userId },
            data: updateProfileDto,
        });
        return { message: 'Profile has been updated successfully' };
    }
    getProfile(userId) {
        return this.prisma.profile.findFirst({
            where: { userId },
            select: { age: true, bio: true, gender: true, locationId: true },
        });
    }
    async createResume(userId, createResumeDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        const existingResume = await this.prisma.resume.findUnique({
            where: { userId },
        });
        if (existingResume) {
            throw new common_1.ConflictException(`User with ID ${userId} already has a resume. Consider implementing an update endpoint.`);
        }
        return this.prisma.resume.create({
            data: {
                userId,
                workExperience: createResumeDto.workExperience,
                education: createResumeDto.education,
            },
        });
    }
    async getResume(userId) {
        const resume = await this.prisma.resume.findUnique({ where: { userId } });
        if (!resume) {
            return null;
        }
        return resume;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map