import { Injectable } from '@nestjs/common';
import { ConfigService, PrismaService } from '../common';

@Injectable()
export class LineService {

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) { }

  async createUser(body: any) {
    return await this.prisma.user.create({
      data: {
        userId: body.userId,
        displayName: body.displayName,
        pictureUrl: body.pictureUrl,
        statusMessage: body.statusMessage,
        expiresIn: new Date(Date.now() + this.config.get('jwt.expiresIn')),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
  }

  async findByUserId(userId: any) {
    return await this.prisma.user.findFirst({
      where: {
        userId: userId
      },
    });
  }


  async updateUser(body: any) {
    return await this.prisma.user.update({
      where: {
        userId: body.userId
      },
      data: {
        displayName: body.displayName,
        pictureUrl: body.pictureUrl,
        statusMessage: body.statusMessage,
        expiresIn: new Date(Date.now() + this.config.get('jwt.expiresIn')),
        updatedAt: new Date(),
      }
    });
  }
}
