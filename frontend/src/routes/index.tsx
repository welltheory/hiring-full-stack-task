import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/views/Home';
import LoadingFallback from './LoadingFallback';

// Lazy load the Notifications view for better performance
const Notifications = lazy(() => import('@/views/Notifications')
  .then((module) => ({ default: module.Notifications })));

/**
 * Application routing configuration
 *
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/notifications/*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Notifications />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
