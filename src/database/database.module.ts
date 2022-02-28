import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../config/database/database-config.interface';
import models from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => {
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        return {
          host: databaseConfig.host,
          port: databaseConfig.port,
          dialect: databaseConfig.dialect,
          database: databaseConfig.database,
          username: databaseConfig.username,
          password: databaseConfig.password,
          models: models,
          define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
            schema: databaseConfig.schema,
          },
        };
      },
    }),

    SequelizeModule.forFeature(models),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
