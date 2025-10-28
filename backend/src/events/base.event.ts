export type BaseEventParams<TData = Record<string, any>> = {
  data: TData;
};

export abstract class BaseEvent<TData = Record<string, any>> {
  // Static properties (defined by subclasses)
  static readonly eventName: string;
  static readonly version: string = '1.0.0';

  // Instance properties
  readonly name: string;
  readonly version: string;
  readonly timestamp: Date;
  readonly id: string;
  public readonly data: TData;

  constructor(params: BaseEventParams<TData>) {
    // Get static values from subclass
    const constructor = this.constructor as typeof BaseEvent;
    this.name = constructor.eventName;
    this.version = constructor.version;
    this.timestamp = new Date();
    this.id = this.generateId();
    this.data = params.data;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Serialize event to JSON for transport
   */
  toJSON(): string {
    return JSON.stringify({
      name: this.name,
      version: this.version,
      timestamp: this.timestamp.toISOString(),
      id: this.id,
      data: this.getData(),
    });
  }

  /**
   * Get event-specific data (implemented by subclasses)
   */
  protected abstract getData(): TData;
}
