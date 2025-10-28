/**
 * Constructor type for class constructors
 */
export type Constructor<T> = new (...args: any[]) => T;