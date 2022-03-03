import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configs } from 'src/config/configuration';
import { EventEmitterGlobalModule } from './global';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configs],
      expandVariables: true,
    }),

    EventEmitterGlobalModule,
  ],
})
export class ThirdPartyModule {}
