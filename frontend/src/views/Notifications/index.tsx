import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Overview } from './Overview';
import { Record } from './Record';

/**
 * Notifications view with nested routing
 *
 * Routes:
 * - /notifications (index) -> Overview (list of notifications)
 * - /notifications/:notificationId -> Record (notification details)
 */
export const Notifications: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path=":notificationId" element={<Record />} />
      <Route path="*" element={<Navigate to="/notifications" replace />} />
    </Routes>
  );
};
