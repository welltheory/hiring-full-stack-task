import React from 'react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

type QueryProviderProps = {
  children: ReactNode;
};

/**
 * TanStack Query provider with configured defaults
 *
 * Configuration:
 * - retry: 1 - Retry failed requests once
 * - refetchOnWindowFocus: false - Don't refetch when user returns to tab
 * - staleTime: 5 minutes - Cache data for 5 minutes before marking as stale
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
