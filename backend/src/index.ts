import '../alias';
import { Server } from 'http';
import { app } from './app';
import { envs } from '$envs';
import { EventsDiscoveryService } from './events/discovery.service';
import { runWorker } from './temporal/worker';
import type { Worker } from '@temporalio/worker';

const eventsDiscoveryService = EventsDiscoveryService.getInstance();

let temporalWorker: Worker | null = null;
let server: Server | null = null;

function setupTemporalWorker() {
  const shouldRunWorker = process.env.RUN_TEMPORAL_WORKER !== 'false';

  if (shouldRunWorker) {
    try {
      console.log('🔧 Starting Temporal worker...');
      // Run worker in background (non-blocking)
      runWorker().catch(error => {
        console.error('❌ Temporal worker error:', error);
        // Don't crash the server if worker fails
      });
    } catch (error) {
      console.error('❌ Failed to start Temporal worker:', error);
      console.warn('⚠️  Server will continue without Temporal worker');
    }
  } else {
    console.log('⏭️  Temporal worker disabled (RUN_TEMPORAL_WORKER=false)');
  }
}

function setupServer() {
  const PORT = envs.port;
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${envs.nodeEnv}`);
  });
}

async function shutdown(signal: string) {
  console.log(`\n${signal} received, starting graceful shutdown...`);

  // Stop accepting new connections
  if (server) {
    server.close(() => {
      console.log('✅ HTTP server closed');
    });
  }

  // Stop Temporal worker if running
  if (temporalWorker) {
    console.log('🛑 Stopping Temporal worker...');
    temporalWorker.shutdown();
  }

  // Exit after cleanup
  setTimeout(() => {
    console.log('👋 Shutdown complete');
    process.exit(0);
  }, 1000);
};

async function start() {
  // Register event classes and handlers before starting server
  await Promise.all([
    eventsDiscoveryService.registerEventClasses(),
    eventsDiscoveryService.registerEventHandlers(),
  ]);

  // Setup Temporal worker
  setupTemporalWorker();

  // Setup server
  setupServer();

  // Handle shutdown signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
