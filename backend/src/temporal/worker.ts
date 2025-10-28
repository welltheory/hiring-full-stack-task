import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities/user-onboarding.activities';

export type WorkerParams = {
  address?: string;
  namespace?: string;
  taskQueue?: string;
};

/**
 * Create and run Temporal worker
 *
 * The worker:
 * - Connects to Temporal server
 * - Polls for workflow and activity tasks
 * - Executes workflows and activities
 * - Reports results back to Temporal
 *
 * Workers can be scaled horizontally - run multiple instances
 * for higher throughput and fault tolerance.
 */
export async function runWorker(params: WorkerParams = {}): Promise<Worker> {
  const address = params.address || process.env.TEMPORAL_ADDRESS || 'localhost:7233';
  const namespace = params.namespace || process.env.TEMPORAL_NAMESPACE || 'default';
  const taskQueue = params.taskQueue || process.env.TEMPORAL_TASK_QUEUE || 'user-events';

  try {
    // Connect to Temporal server
    const connection = await NativeConnection.connect({ address });

    console.log(`🔌 Connected to Temporal at ${address}`);

    // Create worker with workflows and activities
    const worker = await Worker.create({
      connection,
      namespace,
      taskQueue,
      workflowsPath: require.resolve('./workflows/user-onboarding.workflow'),
      activities,
    });

    console.log(`✅ Temporal worker created for task queue: ${taskQueue}`);
    console.log(`📋 Registered activities:`, Object.keys(activities));
    console.log(`🚀 Starting worker...`);

    // Start worker (this is a long-running process)
    await worker.run();

    return worker;
  } catch (error) {
    console.error('❌ Failed to start Temporal worker:', error);
    throw error;
  }
}

// If this file is run directly (not imported), start the worker
if (require.main === module) {
  runWorker()
    .then(() => {
      console.log('✅ Worker started successfully');
    })
    .catch(error => {
      console.error('Failed to start worker:', error);
      process.exit(1);
    });
}
