import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../config/database/database-config.interface';
import models from './models';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { IElasticsearchConfig } from '../config/elasticsearch';

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

    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const elasticsearchConfig =
          configService.get<IElasticsearchConfig>('elasticsearch');
        return {
          node: elasticsearchConfig.node,
          auth: {
            username: elasticsearchConfig.username,
            password: elasticsearchConfig.password,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],

  exports: [SequelizeModule, ElasticsearchModule],
})
export class DatabaseModule {}
