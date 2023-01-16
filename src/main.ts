import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4325, () => {
    console.log(`🚀 Server ready at: http://localhost:4325`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
