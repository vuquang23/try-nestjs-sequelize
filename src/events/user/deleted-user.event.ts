import { APP_EVENT } from '../event.const';
import { IEventPayload } from '../../common/interfaces/event-payload.interface';

export class DeletedUserEventPayload {
  userId: number;
}

export class DeletedUserEvent implements IEventPayload {
  public static event = APP_EVENT.USER_DELETED;
  payload: DeletedUserEventPayload;
  constructor(data: DeletedUserEventPayload) {
    Object.assign(this, { payload: data });
  }
}
