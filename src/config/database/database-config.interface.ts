import { Dialect } from 'sequelize';

export interface IDatabaseConfig {
  dialect: Dialect;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  schema: string;
}
