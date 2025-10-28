import fs from 'fs';
import path from 'path';
import { eventsRegistry } from './events.registry';
import { BaseEventHandler } from './handlers/base.handler';
import { BaseEvent } from './base.event';
import { Constructor } from '../types';

export class EventsDiscoveryService {
  private static instance: EventsDiscoveryService;

  private constructor() {}

  static getInstance(): EventsDiscoveryService {
    if (!EventsDiscoveryService.instance) {
      EventsDiscoveryService.instance = new EventsDiscoveryService();
    }
    return EventsDiscoveryService.instance;
  }

  /**
   * Recursively scan directory for .handler.ts files
   */
  private scanForHandlers(dir: string, handlers: string[] = []): string[] {
    if (!fs.existsSync(dir)) {
      return handlers;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.scanForHandlers(filePath, handlers);
      } else if (
        file.endsWith('.handler.ts') &&
        file !== 'base.handler.ts'
      ) {
        handlers.push(filePath);
      }
    }

    return handlers;
  }

  /**
   * Recursively scan directory for .event.ts files
   */
  private scanForEvents(dir: string, events: string[] = []): string[] {
    if (!fs.existsSync(dir)) {
      return events;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.scanForEvents(filePath, events);
      } else if (
        file.endsWith('.event.ts') &&
        file !== 'base.event.ts'
      ) {
        events.push(filePath);
      }
    }

    return events;
  }

  /**
   * Register all event handlers by scanning handlers directory
   * Auto-discovers handlers with .handler.ts extension
   */
  async registerEventHandlers(): Promise<void> {
    const handlersDir = path.join(__dirname, 'handlers');
    const handlerFiles = this.scanForHandlers(handlersDir);

    const errors: string[] = [];

    for (const handlerFile of handlerFiles) {
      try {
        // Dynamic import
        const module = await import(handlerFile);

        // Find exported handler class
        for (const exportedItem of Object.values(module)) {
          if (
            typeof exportedItem === 'function' &&
            exportedItem.prototype instanceof BaseEventHandler
          ) {
            const Handler = exportedItem as Constructor<BaseEventHandler> & {
              eventName?: string;
            };

            const eventName = Handler.eventName;
            if (!eventName) {
              errors.push(`Handler ${Handler.name} does not have an eventName property`);
              continue;
            }

            eventsRegistry.registerHandler(eventName, Handler);
          }
        }
      } catch (error) {
        errors.push(`Failed to load handler from ${handlerFile}: ${error}`);
      }
    }

    if (errors.length > 0) {
      errors.forEach(error => console.error(error));
      throw new Error('Failed to register event handlers. See above for details.');
    }

    console.log(`✅ Registered ${eventsRegistry.countHandlers()} event handlers.`);
  }

  /**
   * Register all event classes by scanning event directories
   * Auto-discovers events with .event.ts extension
   */
  async registerEventClasses(): Promise<void> {
    const eventsBaseDir = path.join(__dirname);
    const eventFiles = this.scanForEvents(eventsBaseDir);

    const errors: string[] = [];

    for (const eventFile of eventFiles) {
      try {
        // Dynamic import
        const module = await import(eventFile);

        // Find exported event class
        for (const exportedItem of Object.values(module)) {
          if (
            typeof exportedItem === 'function' &&
            exportedItem.prototype instanceof BaseEvent
          ) {
            const EventClass = exportedItem as Constructor<BaseEvent> & {
              eventName?: string;
            };

            const eventName = EventClass.eventName;
            if (!eventName) {
              errors.push(`Event ${EventClass.name} does not have an eventName property`);
              continue;
            }

            eventsRegistry.registerEvent(eventName, EventClass as Constructor<BaseEvent> & { eventName: string });
          }
        }
      } catch (error) {
        errors.push(`Failed to load event from ${eventFile}: ${error}`);
      }
    }

    if (errors.length > 0) {
      errors.forEach(error => console.error(error));
      throw new Error('Failed to register event classes. See above for details.');
    }

    console.log(`✅ Registered ${eventsRegistry.countEvents()} event classes.`);
  }
}

