import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  await app.listen(4000);
}
bootstrap();
