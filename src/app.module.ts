import {
  AirVisualService,
  CmcService,
  ConfigService,
  CryptoCurrencyService,
  ExceptionsFilter,
  LineService,
  OpenAiService,
  UsersRepository,
  UtilService,
} from './common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './common/providers/database.service';
import { ExchangeService } from './common/providers/exchange.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './common/providers/prisma.service';
import { configuration } from './config';
import { CmcRepository } from './common/repository/cmc.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [
    AirVisualService,
    AppService,
    CmcRepository,
    CmcService,
    ConfigService,
    CryptoCurrencyService,
    DatabaseService,
    ExchangeService,
    LineService,
    OpenAiService,
    PrismaService,
    UsersRepository,
    UtilService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
