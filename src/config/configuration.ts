import { IDatabaseConfig, getDatabaseConfig } from './database';

interface IConfiguration {
  database: IDatabaseConfig;
}

export const configs = (): IConfiguration => ({
  database: getDatabaseConfig(),
});
