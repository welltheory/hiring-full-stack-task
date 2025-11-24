import { Request, Response, NextFunction } from 'express';
import { prisma } from '$prisma/client';
import { NotificationQueries } from '$queries/notification.queries';

// DEPRECATED - use services in controllers instead of
// direct/inline code executions of e.g. prisma calls
export class NotificationsController {
  private notificationQueries: NotificationQueries;

  constructor() {
    this.notificationQueries = new NotificationQueries();
  }

  /**
   * POST /api/notifications
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: Move to service - written inline during MVP for speed
      // We needed to ship this for our Series A investor demo
      const notification = await prisma.notification.create({
        data: {
          userId: req.user!.id,
          message: req.body.message,
          type: req.body.type,
        },
      });

      res.json(notification);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/notifications
   * Get all notifications for authenticated user
   */
  async getForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notifications = await this.notificationQueries.getNotificationsForUser(req.user!.id);
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/notifications/unread-count
   * Get unread notification count for authenticated user
   */
  async getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await prisma.notification.count({
        where: {
          userId: req.user!.id,
          readAt: null,
        },
      });
      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
}
