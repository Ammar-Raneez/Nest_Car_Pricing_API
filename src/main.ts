import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// use requires due to a compatibility issue with cookie session and tsconfig
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // the key will be used to encrypt the data in the cookie
  app.useGlobalPipes(cookieSession({ keys: ['asdasdas'] }));

  app.useGlobalPipes(
    new ValidationPipe({
      // remove off all other attribtues in body with aren't a part of the dto
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
