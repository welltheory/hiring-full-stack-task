/**
 * Notification API types
 *
 * These types match the backend DTOs and Prisma models.
 */

export type Notification = {
  id: string;
  userId: string;
  message: string;
  type: string;
  readAt: string | null;
  createdAt: string;
};

export type CreateNotificationParams = {
  userId: string;
  message: string;
  type: string;
};

export type GetUserNotificationsParams = {
  userId: string;
};

export type GetUnreadCountParams = {
  userId: string;
};

export type GetUserNotificationsResponse = Notification[];

export type GetUnreadCountResponse = {
  count: number;
};