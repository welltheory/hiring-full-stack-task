import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type Language = 'en';

type AppState = {
  language: Language;
};

type AppContextType = AppState & {
  setLanguage: (language: Language) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

/**
 * Global application state provider
 *
 * Manages application-level state like language preferences.
 * For now, language is statically set to 'en' but could be extended
 * to support multiple languages with state management.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = React.useState<AppState>({
    language: 'en',
  });

  const setLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const value: AppContextType = {
    ...state,
    setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to access global app state
 *
 * @example
 * const { language, setLanguage } = useApp();
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
