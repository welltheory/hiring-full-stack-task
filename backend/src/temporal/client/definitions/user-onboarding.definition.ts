import { IWorkflowAsyncDefinition, WorkflowStartParams } from './definition.interface';
import { UserOnboardingWorkflowParams, UserOnboardingWorkflowPayload } from '$temporal/workflows/user-onboarding.workflow';
import { TemporalConnector } from '../connector';

export type UserOnboardingTriggerParams = WorkflowStartParams<UserOnboardingWorkflowParams>;

export class UserOnboardingWorkflowDefinition implements IWorkflowAsyncDefinition<
  UserOnboardingTriggerParams,
  UserOnboardingWorkflowPayload
> {
  static readonly workflowName = 'userOnboardingWorkflow';

  private readonly connector = TemporalConnector.getInstance();

  provideWorkflowId(params: UserOnboardingTriggerParams): string {
    return `user_${params.data.userId}`;
  }

  async start(params: UserOnboardingTriggerParams) {
    const workflowId = this.provideWorkflowId(params);
    const client = await this.connector.getClient();
    const handle = await client.workflow.start(
      UserOnboardingWorkflowDefinition.workflowName,
      {
        taskQueue: 'user-events',
        workflowId,
        args: [params.data],
      }
    );
    return {
      handle: handle.workflowId,
    };
  }
}

