import * as Utils from '$envs/utils';

const nodeEnv = process.env.NODE_ENV || 'development';

export const envs = {
  nodeEnv,
  isDev: nodeEnv === 'development',
  isProd: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  logLevel: Utils.getString(process.env.LOG_LEVEL, 'info'),
  databaseUrl: Utils.required(process.env.DATABASE_URL, 'DATABASE_URL'),
  port: Utils.getNumber(process.env.PORT, 3031),
  service: Utils.getString(process.env.SERVICE, 'local'),
};
