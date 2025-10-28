import { v4 as uuidv4 } from 'uuid';
import { BaseEvent } from '../base.event';

export abstract class BaseEventHandler<T extends BaseEvent = BaseEvent> {
  readonly id = uuidv4();
  
  /**
   * Event name this handler responds to
   * Must be defined by subclasses
   */
  static readonly eventName: string;

  /**
   * Handle the event (async, non-blocking)
   * @param event - The event to handle
   *
   * Note: Handler execution should be idempotent and atomic.
   * Consider:
   * - Idempotency: Has this event.id been processed before?
   */
  abstract handle(event: T): Promise<void>;
}
