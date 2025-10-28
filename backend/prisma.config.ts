import * as path from 'path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: { 
    path: path.join('prisma', 'migrations'),
  },
  views: { 
    path: path.join('prisma', 'views'),
  },
  typedSql: {
    path: path.join('prisma', 'queries'),
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});