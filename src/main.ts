import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { env } from 'process';

const serverPort = parseInt(env.SERVER_PORT || '5000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  const appService = app.get(AppService);

  app.useLogger(appService.logger);

  appService.logger.info(`App listening on http://0.0.0.0:${serverPort}`);

  await app.listen(serverPort);
}

bootstrap().catch(console.error);
