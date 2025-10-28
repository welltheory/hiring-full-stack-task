import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Typography, Space, Layout } from '@/components/system';
import styles from './styles.module.scss';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

/**
 * Home page
 *
 * Landing page for the application
 */
export const Home: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Space
          className={classNames(styles.space)}
          direction="vertical"
          size="large"
        >
          <Title>Welcome to the Notification Dashboard</Title>
          <Paragraph>
            This is a demo application for managing user notifications.
          </Paragraph>
          <Paragraph>
            <Link to="/notifications">View Notifications</Link>
          </Paragraph>
        </Space>
      </Content>
    </Layout>
  );
};
