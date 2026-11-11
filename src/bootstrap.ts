import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtSecret } from './config';
export async function makeApp() {
  jwtSecret();
  const app=await NestFactory.create(AppModule,{logger:false});
  app.setGlobalPrefix('api/v1');return app;
}
