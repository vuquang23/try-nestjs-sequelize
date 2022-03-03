import { UserResponseDto } from '../../modules/users/dto/response/user.dto';
import { APP_EVENT } from '../event.const';
import { IEventPayload } from '../../common/interfaces/event-payload.interface';

export class UpdatedUserEventPayload {
  user: UserResponseDto;
}

export class UpdatedUserEvent implements IEventPayload {
  public static event = APP_EVENT.USER_UPDATED;
  payload: UpdatedUserEventPayload;
  constructor(data: UpdatedUserEventPayload) {
    Object.assign(this, { payload: data });
  }
}
