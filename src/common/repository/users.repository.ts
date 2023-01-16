import { Injectable } from '@nestjs/common';
import { ConfigService } from '../providers/config.service';
import { PrismaService } from '../providers/prisma.service';

@Injectable()
export class UsersRepository {
  expiresIn = 0;
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.expiresIn = Number(this.config.get('jwt.expiresIn'));
  }

  async findById(userId: string) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async add(user: any) {
    const data = {
      ...user,
      expiresIn: new Date(Date.now() + this.expiresIn),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.prisma.user.create({
      data: data,
    });
  }

  async update(user: any) {
    const data = {
      $set: {
        ...user,
        expiresIn: new Date(Date.now() + this.expiresIn),
        updatedAt: new Date(),
      },
    };
    const find = await this.findById(user.userId);
    return this.prisma.user.update({
      where: {
        id: find.id,
      },
      data: data,
    });
  }
}
