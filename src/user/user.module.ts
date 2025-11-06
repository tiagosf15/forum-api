import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module'; // se UserService depende do PrismaService
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)], // se UserService depende do PrismaService
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // necessário se outro módulo precisa dele
})
export class UserModule {}
