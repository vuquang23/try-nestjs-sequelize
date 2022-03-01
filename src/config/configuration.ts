import { IDatabaseConfig, getDatabaseConfig } from './database';
import { IAppConfig } from './app/app-config.interface';
import { getAppConfig } from './app/app.config';
import { getSwaggerConfig } from './swagger/swagger.config';
import { ISwaggerConfig } from './swagger';

interface IConfiguration {
  app: IAppConfig;
  database: IDatabaseConfig;
  swagger: ISwaggerConfig;
}

export const configs = (): IConfiguration => ({
  app: getAppConfig(),
  database: getDatabaseConfig(),
  swagger: getSwaggerConfig(),
});
