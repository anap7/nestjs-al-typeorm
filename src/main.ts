import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    //Qualquer propriedade que não esteja dentro do DTO retornará erro
    forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
