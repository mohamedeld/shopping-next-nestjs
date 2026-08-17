import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import ms, { StringValue } from 'ms';
import { User } from 'generated/prisma/client';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from 'src/common/configration/enviornment.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService<IEnvironment>,
    private readonly jwtService: JwtService,
  ) {}
  async verifyUser(email: string, password: string) {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new BadRequestException('User is not exist');
    }
    const comparedPassword = await bcrypt.compare(password, user?.password);
    if (!comparedPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    return user;
  }
  login(user: User, response: Response) {
    const expires = new Date();
    expires?.setMilliseconds(
      expires?.getMilliseconds() +
        ms(this.configService.getOrThrow<StringValue>('jwt_expires')),
    );
    const tokenPayload: TokenPayload = {
      userId: user?.id,
    };
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
    });
    return {
      tokenPayload,
    };
  }
}
