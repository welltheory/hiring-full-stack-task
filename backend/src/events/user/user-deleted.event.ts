import { BaseEvent } from '../base.event';

export type UserDeletedEventData = {
  userId: string;
};

export class UserDeletedEvent extends BaseEvent<UserDeletedEventData> {
  static readonly eventName = 'user.deleted';
  static readonly version = '1.0.0';

  constructor(data: UserDeletedEventData) {
    super({ data });
  }

  protected getData() {
    return this.data;
  }
}
