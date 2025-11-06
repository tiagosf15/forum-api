import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule, QuestionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
