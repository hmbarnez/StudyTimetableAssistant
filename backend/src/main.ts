import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8081', // Replace with the frontend URL you're using
    credentials: true, // If you need to allow cookies or authentication
  });

  await app.listen(3000);
}
bootstrap();
