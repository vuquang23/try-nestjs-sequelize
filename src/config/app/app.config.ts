import { IAppConfig } from './app-config.interface';

export const getAppConfig = (): IAppConfig => ({
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  env: process.env.APP_ENV || 'development',
  apiPrefix: process.env.APP_API_PREFIX,
  enableCors: process.env.APP_ENABLE_CROSS === 'true',
  corsOrigin: (process.env.APP_CORS_ORIGIN ?? '').split(','),
});
