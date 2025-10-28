import { prisma } from '$prisma/client';

export type NotificationServiceSendParams = {
  userId: string;
  message: string;
  type: string;
};

export class NotificationService {
  async send(data: NotificationServiceSendParams) {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    if (!data.userId || !data.message || !data.type) {
      throw new Error('Missing required fields');
    }

    try {
      const notification = await prisma.notification.create({
        data: {
          userId: data.userId,
          message: data.message,
          type: data.type,
        },
      });

      return notification;
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });
  }
}
