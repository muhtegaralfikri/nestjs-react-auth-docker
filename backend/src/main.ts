import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:5173',
  ];
  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin || 
        allowedOrigins.some(allowed => origin.startsWith(allowed)) ||
        origin.endsWith('.github.dev')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
