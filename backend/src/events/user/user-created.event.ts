import { BaseEvent } from '../base.event';

export type UserCreatedEventData = {
  userId: string;
  email: string;
};

export class UserCreatedEvent extends BaseEvent<UserCreatedEventData> {
  static readonly eventName = 'user.created';
  static readonly version = '1.0.0';

  constructor(data: UserCreatedEventData) {
    super({ data });
  }

  protected getData() {
    return this.data;
  }
}
