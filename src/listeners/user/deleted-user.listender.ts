import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAMES } from '../../jobs/job.constant';
import { Queue } from 'bull';
import { OnEvent } from '@nestjs/event-emitter';
import { DeletedUserEvent, DeletedUserEventPayload } from 'src/events';
import { JOBS } from '../../jobs/job.constant';

@Injectable()
export class DeletedUserListener {
  constructor(@InjectQueue(QUEUE_NAMES.SYNC_QUEUE) private syncQueue: Queue) {}

  @OnEvent(DeletedUserEvent.event)
  async onUserDeleted(deletedUserEvent: DeletedUserEvent) {
    this.syncUser(deletedUserEvent.payload);
  }

  async syncUser(payload: DeletedUserEventPayload) {
    const data = payload.userId;
    this.syncQueue
      .add(JOBS.DELETE_USER, { id: data }, { removeOnComplete: true })
      .catch((err) => console.log(err));
  }
}
