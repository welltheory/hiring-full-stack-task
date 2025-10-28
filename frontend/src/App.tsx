import { Providers } from '@/providers';
import { AppRouter } from '@/routes';

/**
 * Root Application Component
 *
 * Wraps the entire application with providers and sets up routing.
 */
function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
