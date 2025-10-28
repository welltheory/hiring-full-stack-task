import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Space, Spin, Empty, Tag } from '@/components/system';
import { useUserNotifications } from '@/hooks/useNotifications';
import { CustomButton } from '@/components/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './styles.module.scss';

dayjs.extend(relativeTime);

const { Title } = Typography;
const { Content } = Layout;

/**
 * Notifications Overview
 *
 * Displays a list of all notifications for the authenticated user.
 * Authentication is handled via the X-Auth-User-Id header sent automatically
 * by the Fetch wrapper, populated from envs.currentUserId.
 */
export const Overview: React.FC = () => {
  const { data: notifications, isLoading } = useUserNotifications();

  if (isLoading) {
    return (
      <Layout className={styles.container}>
        <Content className={styles.content}>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <div className={styles.header}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Title level={2}>Notifications</Title>
              <Space>
                <Link to="/">Home</Link>
              </Space>
            </div>
          </Space>
        </div>

        {notifications && notifications.length > 0 ? (
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  !notification.readAt ? styles.unread : ''
                }`}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Space>
                    <Tag color={notification.type === 'info' ? 'blue' : 'default'}>
                      {notification.type}
                    </Tag>
                    {!notification.readAt && <Tag color="red">Unread</Tag>}
                  </Space>
                  <div className={styles.message}>{notification.message}</div>
                  <div className={styles.meta}>{dayjs(notification.createdAt).fromNow()}</div>
                </Space>
              </div>
            ))}
          </div>
        ) : (
          <Empty description="No notifications" />
        )}
      </Content>
    </Layout>
  );
};
