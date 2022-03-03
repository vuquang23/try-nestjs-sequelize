import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAMES } from '../jobs/job.constant';
import userListeners from './user';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_NAMES.SYNC_QUEUE })],
  providers: [...userListeners],
})
export class ListenerModule {}
