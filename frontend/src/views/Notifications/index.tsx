import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Overview } from './Overview';

export const Notifications = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="*" element={<Navigate to="/notifications" replace />} />
    </Routes>
  );
};
