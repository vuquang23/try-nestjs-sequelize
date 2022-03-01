import * as env from 'dotenv';
env.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/app/app-config.interface';
import { AppProvider } from './providers/app/app.provider';
import { HandleResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  AppProvider.init(app, AppModule, configService);

  const appConfig = configService.get<IAppConfig>('app');
  if (appConfig.enableCors) {
    app.enableCors({
      origin: '*',
    });
  }
  app.setGlobalPrefix(appConfig.apiPrefix);

  app.useGlobalInterceptors(new HandleResponseInterceptor());

  await app.listen(appConfig.port);
}

bootstrap();
