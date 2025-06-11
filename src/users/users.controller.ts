import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/profile')
  async getUserProfile(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserProfileById(userId);
  }

  @Get(':id/resume')
  async getUserResume(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserResumeById(userId);
  }

  @Get(':id/projects')
  async getUserProjects(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserProjectsById(userId);
  }
}
