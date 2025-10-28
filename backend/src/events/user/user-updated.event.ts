import { BaseEvent } from '../base.event';

export type UserUpdatedEventData = {
  userId: string;
  changes: Record<string, any>;
};

export class UserUpdatedEvent extends BaseEvent<UserUpdatedEventData> {
  static readonly eventName = 'user.updated';
  static readonly version = '1.0.0';

  constructor(data: UserUpdatedEventData) {
    super({ data });
  }

  protected getData() {
    return this.data;
  }
}
