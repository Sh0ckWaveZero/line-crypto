import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

declare const module: any;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const host = configService.get('host');
  app.use(helmet());
  app.enableCors();
  await app.listen(port, () => {
    console.log(`🚀 Server ready at: ${host}:${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
