import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Typography, Space } from '@/components/system';
import { CustomButton } from '@/components/system';
import styles from './styles.module.scss';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

/**
 * Notification Record (Detail View)
 *
 * Displays details for a single notification.
 * This is a placeholder for future expansion.
 */
export const Record: React.FC = () => {
  const { notificationId } = useParams<{ notificationId: string }>();

  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Link to="/notifications">
            <CustomButton>← Back to Notifications</CustomButton>
          </Link>

          <div className={styles.card}>
            <Title level={2}>Notification Details</Title>
            <Paragraph>
              This is a placeholder for notification details.
              Notification ID: {notificationId}
            </Paragraph>
            <Paragraph>
              In a full implementation, this would show the complete notification
              details, allow marking as read/unread, and provide actions like delete.
            </Paragraph>
          </div>
        </Space>
      </Content>
    </Layout>
  );
};
