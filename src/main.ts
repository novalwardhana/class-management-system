import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppPort } from './config/env.config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Class Management System API')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env[AppPort]);
}
bootstrap();
