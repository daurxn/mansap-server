import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://mansap.vercel.app', 
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization', 
  });

  const config = new DocumentBuilder()
    .setTitle('Mansap')
    .setDescription('Mansap API description')
    .setVersion('1.0')
    .addTag('mansap')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
