import { BaseEventHandler } from '../base.handler';
import { UserUpdatedEvent } from '$events/user/user-updated.event';

export type UserUpdatedEventHandlerParams = {};

export class UserUpdatedEventHandler extends BaseEventHandler<UserUpdatedEvent> {
  static readonly eventName = 'user.updated';

  constructor(params?: UserUpdatedEventHandlerParams) {
    super();
  }

  async handle(event: UserUpdatedEvent): Promise<void> {
    // Placeholder
  }
}
