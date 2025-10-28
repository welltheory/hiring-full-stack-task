import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

export * from '@prisma/client';
export type { Prisma } from '@prisma/client';