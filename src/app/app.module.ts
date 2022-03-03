import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThirdPartyModule } from './third-parties/third-parties.module';
import { UserModule } from 'src/modules/users/user.module';
import { JobModule } from '../jobs/job.module';
import { ListenerModule } from '../listeners/listener.module';

@Module({
  imports: [ThirdPartyModule, UserModule, JobModule, ListenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
