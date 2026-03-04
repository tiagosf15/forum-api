import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ConfigModule.forRoot({
      isGlobal: true,
    }), QuestionsModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
