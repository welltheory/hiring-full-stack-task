import Fetch from '@/utils/fetch';
import type {
  GetUnreadCountResponse,
} from './types';

const fetch = new Fetch({ path: '/api/notifications' });

/**
 * Get unread notification count for authenticated user
 */
export const getUnreadCount = async (): Promise<GetUnreadCountResponse> => {
  const response = await fetch.get<GetUnreadCountResponse>('/unread-count');
  return response.data;
};
