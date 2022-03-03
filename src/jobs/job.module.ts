import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '../config/redis';
import { QUEUE_NAMES } from './job.constant';
import { UserProcessor } from './processors/user.processor';

@Module({
  imports: [
    DatabaseModule,

    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<IRedisConfig>('redis');
        return {
          redis: {
            db: redisConfig.db,
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
          },
        };
      },
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: QUEUE_NAMES.SYNC_QUEUE,
    }),
  ],
  providers: [UserProcessor],
  exports: [BullModule],
})
export class JobModule {}
