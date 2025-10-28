import { EventEmitter as NodeEventEmitter } from 'events';
import { BaseEvent } from './base.event';
import { eventsRegistry } from './events.registry';

export class EventsEmitter {
  private static instance: EventsEmitter;
  private emitter: NodeEventEmitter;

  private constructor() {
    this.emitter = new NodeEventEmitter();
    this.setupInternalListener();
  }

  static getInstance(): EventsEmitter {
    if (!EventsEmitter.instance) {
      EventsEmitter.instance = new EventsEmitter();
    }
    return EventsEmitter.instance;
  }

  /**
   * Publish an event (async, non-blocking)
   */
  publish(event: BaseEvent): void {
    // Serialize to JSON for transport
    const json = event.toJSON();

    // Emit to internal handler
    this.emitter.emit('domain-event', json);
  }

  /**
   * Internal listener that deserializes and routes to handlers
   */
  private setupInternalListener(): void {
    this.emitter.on('domain-event', async (json: string) => {
      try {
        const parsed = JSON.parse(json);
        const eventName = parsed.name;

        // Look up handler
        const HandlerClass = eventsRegistry.getHandler(eventName);
        if (!HandlerClass) {
          console.warn(`No handler registered for event: ${eventName}`);
          return;
        }

        // Look up event class and reconstruct typed instance
        const EventClass = eventsRegistry.getEventClass(eventName);
        if (!EventClass) {
          console.warn(`No event class registered for: ${eventName}`);
          return;
        }

        // Reconstruct typed event instance from parsed data
        const event = new EventClass(parsed.data);

        // Restore original event metadata (ID, timestamp) to preserve identity
        // This is critical for idempotency tracking and debugging
        Object.assign(event, {
          id: parsed.id,
          timestamp: new Date(parsed.timestamp),
        });

        // Execute handler async (non-blocking) with typed event
        const handler = new HandlerClass();
        await handler.handle(event);
      } catch (error) {
        console.error('Error handling domain event:', error);
        // TODO: Implement proper error handling, dead letter queue, etc.
      }
    });
  }
}

export const eventsEmitter = EventsEmitter.getInstance();
  