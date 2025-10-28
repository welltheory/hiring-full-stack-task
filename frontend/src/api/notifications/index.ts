import Fetch from '@/utils/fetch';
import type {
  GetUserNotificationsResponse,
  GetUnreadCountResponse,
} from './types';

const fetch = new Fetch({ path: '/api/notifications' });

/**
 * Get all notifications for authenticated user
 */
export const getUserNotifications = async (): Promise<GetUserNotificationsResponse> => {
  const response = await fetch.get<GetUserNotificationsResponse>('/');
  return response.data;
};

/**
 * Get unread notification count for authenticated user
 */
export const getUnreadCount = async (): Promise<GetUnreadCountResponse> => {
  const response = await fetch.get<GetUnreadCountResponse>('/unread-count');
  return response.data;
};
