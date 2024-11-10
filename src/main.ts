import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  const logger = new Logger();

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.API_PORT || 3001;

  await app.listen(port, () => {
    logger.log(`👍 server started at http://localhost:${port}`);
    logger.log(`📖 Swagger Docs: http://localhost:${port}/docs`);
  });
}
bootstrap();
