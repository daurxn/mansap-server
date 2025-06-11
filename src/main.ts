import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Setup static file serving from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
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
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
  process.exit(1);
});
