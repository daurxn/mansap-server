import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.uploadProfileImage(req.user.id, file);
  }

  @Post('upload-video')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileVideo(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.uploadProfileVideo(req.user.id, file);
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.update(req.user.id, updateProfileDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.profileService.getProfile(req.user.id);
  }

  @Get('all')
  getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  @Post('resume')
  @UseGuards(AuthGuard)
  createResume(
    @Body() createResumeDto: CreateResumeDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.createResume(req.user.id, createResumeDto);
  }

  @Get('resume')
  @UseGuards(AuthGuard)
  getResume(@Request() req: AuthenticatedRequest) {
    return this.profileService.getResume(req.user.id);
  }

  @Post('projects')
  @UseGuards(AuthGuard)
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.createProject(req.user.id, createProjectDto);
  }

  @Get('projects')
  @UseGuards(AuthGuard)
  getProjects(@Request() req: AuthenticatedRequest) {
    return this.profileService.getProjects(req.user.id);
  }

  @Post('projects/:id/upload-video')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadProjectVideo(
    @Param('id', ParseIntPipe) projectId: number,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.uploadProjectVideo(req.user.id, projectId, file);
  }

  @Patch('projects/:id')
  @UseGuards(AuthGuard)
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.updateProject(req.user.id, id, updateProjectDto);
  }

  @Delete('projects/:id')
  @UseGuards(AuthGuard)
  deleteProject(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.profileService.deleteProject(req.user.id, id);
  }
}
