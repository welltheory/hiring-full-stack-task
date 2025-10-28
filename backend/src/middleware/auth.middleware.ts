import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Authentication Middleware
 *
 * Validates the X-Auth-User-Id header and populates req.user with the authenticated user.
 *
 * Flow:
 * 1. Check for X-Auth-User-Id header
 * 2. If missing → 401 Unauthorized
 * 3. Query database for user with that ID
 * 4. If not found → 404 Not Found
 * 5. If found → attach user to req.user and continue
 *
 * @example
 * // In a controller
 * const userId = req.user.id;
 * const userEmail = req.user.email;
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-auth-user-id'] as string;

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing X-Auth-User-Id header',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: `User with ID ${userId} not found`,
      });
    }

    // Attach user ID to request object
    req.user = { id: user.id };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication failed',
    });
  }
};
