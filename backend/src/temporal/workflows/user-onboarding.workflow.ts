import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from '../activities/user-onboarding.activities';

/**
 * Proxy activities to be called from workflow
 *
 * This creates typed proxies that Temporal uses to:
 * - Track activity execution
 * - Handle retries automatically
 * - Persist state between steps
 * - Enable time-travel debugging
 */
const {
  createUserSettings,
  sendFollowUpEmail,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes', // Max time for activity to complete
  retry: {
    initialInterval: '1 second',
    maximumInterval: '30 seconds',
    backoffCoefficient: 2,
    maximumAttempts: 3,
  },
});

export type UserOnboardingWorkflowParams = {
  userId: string;
  email: string;
};

export type UserOnboardingWorkflowPayload = {
  userId: string;
  email: string;
  settingsResult: activities.CreateUserSettingsResult;
  followUpScheduled: boolean;
};

/**
 * User Onboarding Workflow
 * 
 */
export async function userOnboardingWorkflow(
  params: UserOnboardingWorkflowParams
): Promise<UserOnboardingWorkflowPayload> {
  console.log(`🚀 [Workflow] Starting user onboarding for ${params.email} (${params.userId})`);

  // PHASE 1: Create settings
  const settingsResult = await createUserSettings({
    userId: params.userId,
  });

  // Schedule follow-up email for 24 hours later
  await sendFollowUpEmail({
    userId: params.userId,
    email: params.email,
  });

  const result = {
    userId: params.userId,
    email: params.email,
    settingsResult,
    followUpScheduled: true,
  };

  console.log(`🎉 [Workflow] User onboarding complete for ${params.email}`);

  return result;
}
