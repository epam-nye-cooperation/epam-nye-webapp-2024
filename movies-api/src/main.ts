import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { Configuration } from './app.configuration';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/setup-swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    }
  );
  const config: ConfigService<Configuration> = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    })
  );
  app.enableShutdownHooks();

  app.enableCors({
    credentials: true,
    preflightContinue: true,
  });

  process.on('uncaughtException', (error, source) => {
    PinoLogger.root.error({ message: 'Uncaught exception', error, source });
  });

  await setupSwagger(app, 'api-doc');

  await app.listen(
    config.get('API_PORT'),
    config.get('API_HOST'),
    (error, address) => {
      if (error) {
        PinoLogger.root.error(error);
        return;
      }
      PinoLogger.root.info(
        `Application started in ${process.env.NODE_ENV} environment`
      );
      PinoLogger.root.info(`Service layer is listening on ${address}`);
    }
  );
}
bootstrap();
