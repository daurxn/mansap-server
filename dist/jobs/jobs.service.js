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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const chat_service_1 = require("../chat/chat.service");
let JobsService = class JobsService {
    prisma;
    chatService;
    constructor(prisma, chatService) {
        this.prisma = prisma;
        this.chatService = chatService;
    }
    create(createJobDto, postedById) {
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
    async findAll(userId, search) {
        const where = {};
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
        const result = [];
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
    findByPostedById(id) {
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
    async findOne(userId, id) {
        const job = await this.prisma.job.findUnique({
            where: { id: id },
            include: {
                postedBy: { select: { email: true, name: true, id: true } },
                tags: { select: { name: true } },
                applications: { include: { applicant: true, resume: true } },
            },
        });
        const applications = await this.prisma.application.findMany({
            where: { applicantId: userId },
            select: { job: { select: { id: true } } },
        });
        const applied = job && applications.some((app) => app.job.id === job.id);
        const is_applicable = job?.postedById !== userId;
        return { ...job, is_applicable, applied };
    }
    update(id, updateJobDto) {
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
    remove(id) {
        return this.prisma.job.delete({ where: { id } });
    }
    async createApplication(applicantId, createApplicationDto) {
        const { jobId, coverLetter } = createApplicationDto;
        const applicant = await this.prisma.user.findUnique({
            where: { id: applicantId },
        });
        console.log(applicant, jobId, coverLetter);
        if (!applicant) {
            throw new common_1.NotFoundException(`Applicant with ID ${applicantId} not found.`);
        }
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found.`);
        }
        console.log(1);
        const existingApplication = await this.prisma.application.findFirst({
            where: {
                applicantId: applicantId,
                jobId,
            },
        });
        if (existingApplication) {
            throw new common_1.ConflictException(`You have already applied for job ID ${jobId}.`);
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
            }
            catch (error) {
                console.error('Error creating application:', error);
                throw new common_1.ConflictException('Could not create application. Please ensure all provided IDs are valid and try again.');
            }
        }
    }
    getApplications(userId) {
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
    async acceptApplication(userId, jobId, applicantId) {
        const job = await this.prisma.job.findFirst({
            where: {
                id: jobId,
                postedById: userId,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found or you are not the job poster');
        }
        const application = await this.prisma.application.findFirst({
            where: {
                jobId,
                applicantId,
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        const updatedJob = await this.prisma.job.update({
            where: { id: jobId },
            data: { filledById: applicantId },
        });
        await this.chatService.create({
            participantIds: [userId, applicantId],
            jobId,
        });
        return updatedJob;
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        chat_service_1.ChatService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map