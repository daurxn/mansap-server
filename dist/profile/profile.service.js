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
const uuid_1 = require("uuid");
const supabase_config_1 = require("../config/supabase.config");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadProfileImage(userId, file) {
        try {
            if (!file || !file.originalname || !file.buffer) {
                throw new common_1.BadRequestException('Invalid file upload');
            }
            if (!file.mimetype.includes('image/')) {
                throw new common_1.BadRequestException('Only image files are allowed');
            }
            const fileExt = file.originalname.split('.').pop();
            const fileName = `profiles/${userId}/${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600',
            });
            if (error) {
                throw new common_1.BadRequestException(`Failed to upload image: ${error.message}`);
            }
            const { data: publicUrlData } = supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .getPublicUrl(fileName);
            return { imageUrl: publicUrlData.publicUrl };
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to upload profile image');
        }
    }
    async uploadProfileVideo(userId, file) {
        try {
            if (!file || !file.originalname || !file.buffer) {
                throw new common_1.BadRequestException('Invalid file upload');
            }
            const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!validVideoTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Invalid video format. Supported formats are MP4, WebM, and OGG.');
            }
            const fileExt = file.originalname.split('.').pop();
            const fileName = `profiles/${userId}/video-${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600',
            });
            if (error) {
                throw new common_1.BadRequestException(`Failed to upload video: ${error.message}`);
            }
            const { data: publicUrlData } = supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .getPublicUrl(fileName);
            const videoUrl = publicUrlData.publicUrl;
            await this.prisma.profile.update({
                where: { userId },
                data: { videoUrl },
            });
            return { videoUrl };
        }
        catch (error) {
            console.error('Error uploading video:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to upload profile video');
        }
    }
    async update(userId, updateProfileDto) {
        await this.prisma.profile.update({
            where: { userId },
            data: updateProfileDto,
        });
        return { message: 'Profile has been updated successfully' };
    }
    async getProfile(userId) {
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
            throw new common_1.NotFoundException(`Profile for user ${userId} not found`);
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { name: true },
        });
        let locationName = null;
        if (profile.locationId) {
            const location = await this.prisma.location.findUnique({
                where: { id: profile.locationId },
                select: { name: true },
            });
            locationName = location ? location.name : null;
        }
        return {
            name: user?.name || null,
            age: profile.age,
            bio: profile.bio,
            gender: profile.gender,
            location: locationName,
            imageUrl: profile.imageUrl,
        };
    }
    async getAllProfiles() {
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
        const profilesWithLocation = await Promise.all(profiles.map(async (profile) => {
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
                userId: profile.user.id,
                name: profile.user.name,
                age: profile.age,
                bio: profile.bio,
                gender: profile.gender,
                location: locationName,
                imageUrl: profile.imageUrl,
            };
        }));
        return profilesWithLocation;
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
        return resume
            ? { data: resume, message: 'Has resume' }
            : { message: 'No resume' };
    }
    async createProject(userId, createProjectDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
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
    async getProjects(userId) {
        const projects = await this.prisma.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return {
            data: projects,
            message: projects.length > 0 ? 'Projects found' : 'No projects',
        };
    }
    async getProject(userId, projectId) {
        return await this.prisma.project.findFirst({
            where: { id: projectId, userId },
        });
    }
    async updateProject(userId, projectId, updateProjectDto) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found or does not belong to user');
        }
        return this.prisma.project.update({
            where: { id: projectId },
            data: updateProjectDto,
        });
    }
    async uploadProjectVideo(userId, projectId, file) {
        try {
            const project = await this.prisma.project.findFirst({
                where: {
                    id: projectId,
                    userId,
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found or does not belong to user');
            }
            if (!file || !file.originalname || !file.buffer) {
                throw new common_1.BadRequestException('Invalid file upload');
            }
            const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!validVideoTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Invalid video format. Supported formats are MP4, WebM, and OGG.');
            }
            const maxSize = 100 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new common_1.BadRequestException('Video file too large. Maximum size is 100MB.');
            }
            const fileExt = file.originalname.split('.').pop();
            const fileName = `projects/${projectId}/video-${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600',
            });
            if (error) {
                throw new common_1.BadRequestException(`Failed to upload video: ${error.message}`);
            }
            const { data: publicUrlData } = supabase_config_1.supabaseClient.storage
                .from(supabase_config_1.CHAT_IMAGES_BUCKET)
                .getPublicUrl(fileName);
            const videoUrl = publicUrlData.publicUrl;
            await this.prisma.project.update({
                where: { id: projectId },
                data: { videoUrl },
            });
            return { videoUrl };
        }
        catch (error) {
            console.error('Error uploading project video:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to upload project video');
        }
    }
    async deleteProject(userId, projectId) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found or does not belong to user');
        }
        await this.prisma.project.delete({
            where: { id: projectId },
        });
        return { message: 'Project deleted successfully' };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map