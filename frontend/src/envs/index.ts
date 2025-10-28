import * as Utils from './utils';

const nodeEnv = import.meta.env.MODE || 'development';

/**
 * Environment configuration for the frontend application.
 *
 * Vite exposes environment variables via import.meta.env.
 * Only variables prefixed with VITE_ are exposed to the client.
 *
 * Example .env file:
 * ```
 * VITE_API_URL=http://localhost:3031
 * ```
 */
export const envs = {
  nodeEnv,
  isDev: nodeEnv === 'development',
  isProd: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  apiUrl: Utils.getString(import.meta.env.VITE_API_URL, 'http://localhost:3031'),
  currentUserId: Utils.required(import.meta.env.VITE_CURRENT_USER_ID, 'VITE_CURRENT_USER_ID'),
};
