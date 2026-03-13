
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { User, Prisma } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createdAt: true,
        updatedAt: true,
        question: {
          select: {
            id: true,
            title: true,
            body: true
          }
        },
        answers: {
          select: {
            id: true,
            body: true
          }
        }
      }
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hash,
        question: {
          create: [
            {
              title: 'Sample Question 1',
              body: 'This is a sample question body.',
            }
          ]
        }
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const password = typeof data.password === 'string' ? await bcrypt.hash(data.password, 10) : data.password;
    return this.prisma.user.update({
      data: {
        ...data,
        password,
      },
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
