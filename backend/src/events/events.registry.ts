import { BaseEventHandler } from './handlers/base.handler';
import { BaseEvent } from './base.event';
import { Constructor } from '../types';

export type EventConstructor = Constructor<BaseEvent> & {
  eventName: string;
};

export class EventsRegistry {
  private static instance: EventsRegistry;
  
  private handlers: Map<string, Constructor<BaseEventHandler>> = new Map();
  private events: Map<string, EventConstructor> = new Map();

  private constructor() {}

  static getInstance(): EventsRegistry {
    if (!EventsRegistry.instance) {
      EventsRegistry.instance = new EventsRegistry();
    }
    return EventsRegistry.instance;
  }

  registerHandler(eventName: string, handler: Constructor<BaseEventHandler>): void {
    if (this.handlers.has(eventName)) {
      throw new Error(`Handler for event ${eventName} already exists`);
    }
    this.handlers.set(eventName, handler);
  }

  registerEvent(eventName: string, eventClass: EventConstructor): void {
    if (this.events.has(eventName)) {
      throw new Error(`Event class for ${eventName} already exists`);
    }
    this.events.set(eventName, eventClass);
  }

  getHandler(eventName: string): Constructor<BaseEventHandler> | undefined {
    return this.handlers.get(eventName);
  }

  getEventClass(eventName: string): EventConstructor | undefined {
    return this.events.get(eventName);
  }

  countHandlers(): number {
    return this.handlers.size;
  }

  countEvents(): number {
    return this.events.size;
  }

  getAllEventNames(): string[] {
    return Array.from(this.handlers.keys());
  }
}

export const eventsRegistry = EventsRegistry.getInstance();
