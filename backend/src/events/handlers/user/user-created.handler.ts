import { BaseEventHandler } from '../base.handler';
import { UserCreatedEvent } from '$events/user/user-created.event';
import { UserOnboardingWorkflowDefinition } from '$temporal/client';

export type UserCreatedEventHandlerParams = {
  userOnboardingWorkflow?: UserOnboardingWorkflowDefinition;
};

export class UserCreatedEventHandler extends BaseEventHandler<UserCreatedEvent> {
  private readonly userOnboardingWorkflow: UserOnboardingWorkflowDefinition;
  
  static readonly eventName = 'user.created';

  constructor(params: UserCreatedEventHandlerParams) {
    super();
    this.userOnboardingWorkflow = params.userOnboardingWorkflow ?? new UserOnboardingWorkflowDefinition();
  }

  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(`✅ [Handler] Event logged successfully`);
    const { handle } = await this.userOnboardingWorkflow.start({
      data: {
        userId: event.data.userId,
        email: event.data.email,
      },
    });
    console.log(`✅ [Handler] Workflow started successfully:`, handle);
  }
}
