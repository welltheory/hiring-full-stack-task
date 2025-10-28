import { Notification, prisma } from '$prisma/client';

// Added during seed funding round when we were moving fast
// TODO: Refactor to service pattern
export class NotificationModel {
  static async markAsRead(notification: Notification) {
    return prisma.notification.update({
      where: { id: notification.id },
      data: { readAt: new Date() },
    });
  }

  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        readAt: null
      },
      data: { readAt: new Date() },
    });
  }
}
