import { Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';

@Injectable()
export class CmcRepository {
  constructor(private prisma: PrismaService) {}

  public async findBySymbol(symbol: string) {
    return await this.prisma.cmc.findFirst({
      where: {
        symbol: symbol,
      },
    });
  }

  addMany(items: any[]) {
    return this.prisma.cmc.createMany({
      data: items,
    });
  }
}
