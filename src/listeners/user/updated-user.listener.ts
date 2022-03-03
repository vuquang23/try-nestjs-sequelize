import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAMES } from '../../jobs/job.constant';
import { Queue } from 'bull';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdatedUserEvent, UpdatedUserEventPayload } from 'src/events';
import { JOBS } from '../../jobs/job.constant';

@Injectable()
export class UpdatedUserListener {
  constructor(@InjectQueue(QUEUE_NAMES.SYNC_QUEUE) private syncQueue: Queue) {}

  @OnEvent(UpdatedUserEvent.event)
  async onUserUpdated(updatedUserEvent: UpdatedUserEvent) {
    this.syncUser(updatedUserEvent.payload);
  }

  async syncUser(payload: UpdatedUserEventPayload) {
    const data = payload.user;
    this.syncQueue
      .add(
        JOBS.UPDATE_USER,
        { id: data.id, email: data.email, name: data.name },
        { removeOnComplete: true }
      )
      .catch((err) => console.log(err));
  }
}
