import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://finance-chi.vercel.app'],
    credentials: true,
  });
  await app.listen(PORT);
  console.log(`App is listening on port ${PORT}`);
}
bootstrap();
