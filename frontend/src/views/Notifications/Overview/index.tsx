import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Space } from '@/components/system';
import styles from './styles.module.scss';


const { Title } = Typography;
const { Content } = Layout;

export const Overview = () => {
  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <div className={styles.header}>
          <Space
            className={styles.headerSpace}
            direction="vertical"
            size="small"
          >
            <div className={styles.headerContent}>
              <Title level={2}>Notifications</Title>
              <Space>
                <Link to="/">Home</Link>
              </Space>
            </div>
          </Space>
        </div>
        {/* TODO: Add notifications functionality */}
      </Content>
    </Layout>
  );
};
