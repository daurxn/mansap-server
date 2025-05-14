import {
  Body,
  Controller,
  Get,
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
}
