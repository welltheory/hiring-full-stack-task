import { BaseEventHandler } from '../base.handler';
import { UserDeletedEvent} from '$events/user/user-deleted.event';

export type UserDeletedEventHandlerParams = {};

export class UserDeletedEventHandler extends BaseEventHandler<UserDeletedEvent> {
  static readonly eventName = 'user.deleted';

  constructor(params?: UserDeletedEventHandlerParams) {
    super();
  }

  async handle(event: UserDeletedEvent): Promise<void> {
    // Placeholder
  }
}
