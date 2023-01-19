import { Module } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { ConfigService, PrismaService } from '../common';

@Module({
  controllers: [LineController],
  providers: [LineService, PrismaService, ConfigService]
})
export class LineModule { }
