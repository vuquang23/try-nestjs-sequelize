import { ISwaggerConfig } from './swagger-config.interface';

export const getSwaggerConfig = (): ISwaggerConfig => ({
  enable: process.env.SWAGGER_ENABLE === 'true',
  title: process.env.SWAGGER_TITLE,
  path: process.env.SWAGGER_PATH,
  apiBasePath: process.env.SWAGGER_BASE_PATH,
  version: process.env.SWAGGER_VERSION,
  description: process.env.SWAGGER_DESCRIPTION,
});
