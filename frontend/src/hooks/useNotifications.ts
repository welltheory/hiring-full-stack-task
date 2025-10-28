import { useQuery } from '@tanstack/react-query';
import * as API from '@/api';

/**
 * Query key factory for notifications
 * Helps manage cache invalidation and avoid key duplication
 */
const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: () => [...notificationKeys.lists()] as const,
  unreadCount: () => [...notificationKeys.all, 'unread'] as const,
};

/**
 * Fetch all notifications for authenticated user
 *
 * @example
 * const { data: notifications, isLoading } = useUserNotifications();
 */
export const useUserNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: API.notifications.getUserNotifications,
  });
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
