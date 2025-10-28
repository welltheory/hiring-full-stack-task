import * as UserOnboarding from '../workflows/user-onboarding.workflow';

export type BaseWorkflowParams = {
  taskQueue?: string;
  workflowId?: string;
};

export type TriggerUserOnboardingWorkflowParams = BaseWorkflowParams & {
  workflow: 'user-onboarding';
  params: UserOnboarding.UserOnboardingWorkflowParams;
};

export type TriggerWorkflowParams = 
  | TriggerUserOnboardingWorkflowParams;