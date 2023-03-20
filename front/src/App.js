import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import LoadPage from './components/loading/LoadPage';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <React.Suspense fallback={<LoadPage />}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-base">
          <Outlet />
        </div>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </React.Suspense>
  );
}

export default App;
