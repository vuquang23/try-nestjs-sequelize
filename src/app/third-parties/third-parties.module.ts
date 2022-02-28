import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configs } from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configs],
      expandVariables: true,
    }),
  ],
})
export class ThirdPartyModule {}
