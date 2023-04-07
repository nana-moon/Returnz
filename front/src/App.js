/* eslint-disable camelcase */
import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import LoadPage from './components/loading/LoadPage';
import { store } from './store/Store';
import PrivateRoute from './utils/PrivateRoute';
import ErrorBoundary from './pages/ErrorBoundary';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.error = function () {};
  }
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<LoadPage />}>
          <div className="bg-base min-h-screen">
            <PrivateRoute />
          </div>
          <ReactQueryDevtools initialIsOpen />
        </React.Suspense>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
