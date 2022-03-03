import { IDatabaseConfig, getDatabaseConfig } from './database';
import { IAppConfig } from './app/app-config.interface';
import { getAppConfig } from './app/app.config';
import { getSwaggerConfig } from './swagger/swagger.config';
import { ISwaggerConfig } from './swagger';
import { getElasticsearchConfig } from './elasticsearch/elasticsearch.config';
import { IElasticsearchConfig } from './elasticsearch/elasticsearch-config.interface';
import { IRedisConfig } from './redis/redis-config.interface';
import { getRedisConfig } from './redis/redis.config';

interface IConfiguration {
  app: IAppConfig;
  database: IDatabaseConfig;
  swagger: ISwaggerConfig;
  elasticsearch: IElasticsearchConfig;
  redis: IRedisConfig;
}

export const configs = (): IConfiguration => ({
  app: getAppConfig(),
  database: getDatabaseConfig(),
  swagger: getSwaggerConfig(),
  elasticsearch: getElasticsearchConfig(),
  redis: getRedisConfig(),
});
