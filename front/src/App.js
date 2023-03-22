import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import LoadPage from './components/loading/LoadPage';
import { store } from './app/store';

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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <div className="bg-base h-screen">
            <Outlet />
          </div>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Provider>
    </React.Suspense>
  );
}

export default App;
