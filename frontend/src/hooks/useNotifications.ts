import { useQuery } from '@tanstack/react-query';
import * as API from '@/api';

/**
 * Query key factory for notifications
 */
const notificationKeys = {
  root: ['notifications'] as const,
  unreadCount: () => [...notificationKeys.root, 'unread'] as const,
};

/**
 * Fetch unread notification count for authenticated user
 *
 * @example
 * const { data: { count } } = useUnreadCount();
 */
export const useUnreadCount = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: API.notifications.getUnreadCount,
  });
};
