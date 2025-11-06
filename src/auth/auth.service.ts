import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService,
  ) {}

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: params.email });

    if (!user) throw new NotFoundException('User not found');

    // aqui você pode adicionar comparação de senha, token, etc.
    if (params.password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id};
    return {
      access_token: await this.JwtService.signAsync(payload),
    };
  }
}
