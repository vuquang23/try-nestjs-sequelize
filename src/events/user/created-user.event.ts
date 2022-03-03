import { UserResponseDto } from '../../modules/users/dto/response/user.dto';
import { APP_EVENT } from '../event.const';
import { IEventPayload } from '../../common/interfaces/event-payload.interface';

export class CreatedUserEventPayload {
  user: UserResponseDto;
}

export class CreatedUserEvent implements IEventPayload {
  public static event = APP_EVENT.USER_CREATED;
  payload: CreatedUserEventPayload;
  constructor(data: CreatedUserEventPayload) {
    Object.assign(this, { payload: data });
  }
}
