import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAMES } from '../../jobs/job.constant';
import { Queue } from 'bull';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatedUserEvent, CreatedUserEventPayload } from 'src/events';
import { JOBS } from '../../jobs/job.constant';

@Injectable()
export class CreatedUserListener {
  constructor(@InjectQueue(QUEUE_NAMES.SYNC_QUEUE) private syncQueue: Queue) {}

  @OnEvent(CreatedUserEvent.event)
  async onUserCreated(createdUserEvent: CreatedUserEvent) {
    this.syncUser(createdUserEvent.payload);
  }

  async syncUser(payload: CreatedUserEventPayload) {
    const data = payload.user;
    this.syncQueue
      .add(
        JOBS.CREATE_USER,
        { id: data.id, email: data.email, name: data.name },
        { removeOnComplete: true }
      )
      .catch((err) => console.log(err));
  }
}
