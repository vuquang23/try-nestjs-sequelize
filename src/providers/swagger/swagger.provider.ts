import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerConfig } from 'src/config/swagger';

export class SwaggerProvider {
  public static init(
    app: INestApplication,
    configService: ConfigService
  ): void {
    const swaggerConfig = configService.get<ISwaggerConfig>('swagger');
    if (swaggerConfig.enable) {
      const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addServer(swaggerConfig.apiBasePath)
        .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup(swaggerConfig.path, app, document);
    }
  }
}
