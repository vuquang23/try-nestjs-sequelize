import { IRedisConfig } from './redis-config.interface';

export const getRedisConfig = (): IRedisConfig => ({
  db: parseInt(process.env.REDIS_DB),
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});
