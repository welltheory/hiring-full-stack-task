import React from 'react';
import { Spin } from '@/components/system';

/**
 * Loading fallback component
 */
const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Spin size="large" />
  </div>
);

export default LoadingFallback;