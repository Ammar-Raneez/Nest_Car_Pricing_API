import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // remove off all other attribtues in body with aren't a part of the dto
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
