import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('signin')
    @UseGuards() // No guard needed for sign-in
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() body: Prisma.UserCreateInput) {
        return this.authService.signIn(body);
    }
}
