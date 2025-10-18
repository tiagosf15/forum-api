import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule],
  controllers: [UserController],
})
export class AppModule {}
