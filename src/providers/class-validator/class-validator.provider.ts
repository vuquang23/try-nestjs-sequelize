import {
  INestApplication,
  DynamicModule,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

export class ClassValidatorProvider {
  public static init(app: INestApplication, module: Type | DynamicModule) {
    useContainer(app.select(module), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      })
    );
  }
}
