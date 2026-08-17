import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '../../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: data?.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await bcrypt.hash(data?.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email: data?.email,
        password: hashPassword,
      },
    });
    return user;
  }
  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
