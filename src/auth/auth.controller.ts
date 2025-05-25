import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RoleGuard } from './guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req: AuthenticatedRequest) {
    return this.authService.profile(req.user.id);
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  adminOnlyEndpoint() {
    return 'Welcome admin';
  }
}
