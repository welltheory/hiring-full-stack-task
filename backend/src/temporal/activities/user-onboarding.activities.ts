import { sleep } from '@temporalio/activity';

/**
 * Temporal Activities for User Onboarding Workflow
 * 
 */

export type CreateUserSettingsParams = {
  userId: string;
};

export type CreateUserSettingsResult = {
  success: boolean;
  settingsId: string;
};

/**
 * Activity: Create default user settings
 * Development only: simulates the operation.
 */
export async function createUserSettings(
  params: CreateUserSettingsParams
): Promise<CreateUserSettingsResult> {
  console.log(`⚙️  [Activity] Creating default settings for userId: ${params.userId}`);

  const result = {
    success: true,
    settingsId: `settings-${params.userId}`,
  };

  console.log(`✅ [Activity] User settings created:`, result.settingsId);
  return result;
}

export type SendFollowUpEmailParams = {
  userId: string;
  email: string;
};

export type SendFollowUpEmailResult = {
  success: boolean;
  sentAt: Date;
};

/**
 * Activity: Send follow-up email after 24 hours
 *
 * This demonstrates Temporal's ability to handle long-running workflows with delays.
 * The workflow can sleep for 24 hours and Temporal will resume it exactly when needed.
 */
export async function sendFollowUpEmail(
  params: SendFollowUpEmailParams
): Promise<SendFollowUpEmailResult> {
  console.log(`📧 [Activity] Sending follow-up email to ${params.email} (userId: ${params.userId})`);

  // Simulate email sending delay
  await sleep('30s'); // 30 seconds for demo purposes

  const result = {
    success: true,
    sentAt: new Date(),
  };

  console.log(`✅ [Activity] Follow-up email sent successfully`);
  return result;
}
