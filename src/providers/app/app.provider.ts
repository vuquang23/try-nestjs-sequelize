import { DynamicModule, INestApplication, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerProvider } from '../swagger';
import { ClassValidatorProvider } from '../class-validator/class-validator.provider';

export class AppProvider {
  public static init(
    app: INestApplication,
    rootModule: Type | DynamicModule,
    configService: ConfigService
  ): void {
    SwaggerProvider.init(app, configService);
    ClassValidatorProvider.init(app, rootModule);
  }
}
