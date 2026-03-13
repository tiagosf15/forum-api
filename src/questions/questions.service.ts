import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createQuestionDto: CreateQuestionDto, userId: number) {
    return this.prismaService.questions.create({
      data: { ...createQuestionDto, userId }
    })
  }

  async findAll() {
    return await this.prismaService.questions.findMany({
      include: {
        answers: {
          select: {
            id: true,
            body: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.questions.findUnique({
      where: { id },
      include: {
        answers: {
          select: {
            id: true,
            body: true
          }
        }
      }
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.questions.delete({
      where: { id }
    });
  }
}
