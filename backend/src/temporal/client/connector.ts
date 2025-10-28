import { Connection, Client } from '@temporalio/client';

export type TemporalConnectorParams = {
  address?: string;
  namespace?: string;
};

/**
 * TemporalConnector singleton class
 * Manages a single connection to Temporal server
 */
export class TemporalConnector {
  private static instance: TemporalConnector | null = null;
  private client: Client | null = null;
  private connection: Connection | null = null;

  private constructor() {
    this.connect();
  }

  /**
   * Get the singleton instance of TemporalConnector
   */
  public static getInstance(): TemporalConnector {
    if (!TemporalConnector.instance) {
      TemporalConnector.instance = new TemporalConnector();
    }
    return TemporalConnector.instance;
  }

  /**
   * Initialize and connect to Temporal server
   */
  public async connect(params: TemporalConnectorParams = {}): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    const address = params.address || process.env.TEMPORAL_ADDRESS || 'localhost:7233';
    const namespace = params.namespace || process.env.TEMPORAL_NAMESPACE || 'default';

    try {
      // Create connection to Temporal server
      this.connection = await Connection.connect({ address });

      // Create client with connection
      this.client = new Client({
        connection: this.connection,
        namespace,
      });

      console.log(`✅ Connected to Temporal at ${address} (namespace: ${namespace})`);
      return this.client;
    } catch (error) {
      console.error('Failed to connect to Temporal:', error);
      throw error;
    }
  }

  /**
   * Get the current client instance
   * Throws error if not connected
   */
  public async getClient(): Promise<Client> {
    if (!this.client) await this.connect();
    return this.client!;
  }

  /**
   * Check if client is connected
   */
  public isConnected(): boolean {
    return this.client !== null;
  }

  /**
   * Close Temporal client connection
   * Used for graceful shutdown
   */
  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      this.client = null;
      console.log('✅ Temporal client closed');
    }
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  public static reset(): void {
    if (TemporalConnector.instance) {
      TemporalConnector.instance.close();
      TemporalConnector.instance = null;
    }
  }
}
