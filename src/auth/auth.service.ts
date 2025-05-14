import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }

    const hashedPassword = await hash(data.password, 12);

    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profile: {
        create: {},
      },
    };

    const createUser = await this.prisma.user.create({
      data: userData,
    });

    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register Successful',
      };
    }
  }

  async login(data: LoginDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(
      data.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const accessToken = this.jwtService.sign({
        sub: checkUserExists.id,
        name: checkUserExists.name,
        email: checkUserExists.email,
        role: checkUserExists.role,
      });

      return {
        statusCode: 200,
        message: 'Login berhasil',
        accessToken,
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  profile(user_id: number) {
    return this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
