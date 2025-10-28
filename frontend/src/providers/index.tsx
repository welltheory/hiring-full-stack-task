import React from 'react';
import type { ReactNode } from 'react';
import { AppProvider } from './AppProvider';
import { QueryProvider } from './QueryProvider';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Root provider component that wraps the entire application
 *
 * Combines all providers in the correct order:
 * 1. QueryProvider - TanStack Query for server state
 * 2. AppProvider - Global application state
 */
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <AppProvider>{children}</AppProvider>
    </QueryProvider>
  );
};

export { useApp } from './AppProvider';
