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
} from '@nestjs/common';
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
