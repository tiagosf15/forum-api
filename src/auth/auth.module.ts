import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';



@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: "500ecb9a6f1af6516f5fd6da23a2285007a095bfcbedfad303e809c2587ae4b7",
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule { }
