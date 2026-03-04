import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class AnswersService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId },
      },
      question: {
        connect: { id: Number(questionId) },
      },
    }
    return this.prismaService.answers.create({
      data: newAnswer,
    });
  }


  findAll() {
    return this.prismaService.answers.findMany();
  }

  findOne(id: number) {
    return this.prismaService.answers.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prismaService.answers.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  remove(id: number) {
    return this.prismaService.answers.delete({
      where: { id },
    });
  }
}

