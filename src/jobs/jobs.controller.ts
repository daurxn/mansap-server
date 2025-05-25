import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  create(
    @Body() createJobDto: CreateJobDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.jobsService.create(createJobDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Request() req: AuthenticatedRequest,
    @Query('search') search?: string,
  ) {
    return this.jobsService.findAll(req.user.id, search);
  }

  @Get('mine')
  @UseGuards(AuthGuard)
  findPostedByMe(@Request() req: AuthenticatedRequest) {
    return this.jobsService.findByPostedById(req.user.id);
  }

  @Get(':id/accept/:applicantId')
  @UseGuards(AuthGuard)
  acceptApplication(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Param('applicantId', ParseIntPipe) applicantId: number,
  ) {
    return this.jobsService.acceptApplication(req.user.id, id, applicantId);
  }

  @Get('applications')
  @UseGuards(AuthGuard)
  getApplications(@Request() req: AuthenticatedRequest) {
    return this.jobsService.getApplications(req.user.id);
  }

  @Post('applications')
  @UseGuards(AuthGuard)
  createApplication(
    @Request() req: AuthenticatedRequest,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.jobsService.createApplication(
      req.user.id,
      createApplicationDto,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.jobsService.findOne(req.user.id, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
