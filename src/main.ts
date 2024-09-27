import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS" });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(helmet());
  await app.listen(process.env.PORT);
  if(process.env.NODE_ENV === 'development')
    console.log(`app started at http://localhost:${process.env.port}`);
}
bootstrap();
