export type CreateNotificationParams = {
  userId: string;
  message: string;
  type: string;
};

export type GetUnreadCountParams = {
  userId: string;
};

export type GetUnreadCountResponse = {
  count: number;
};