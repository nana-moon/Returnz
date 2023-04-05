import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import LoadPage from './components/loading/LoadPage';
import { store } from './store/Store';
import PrivateRoute from './utils/PrivateRoute';

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
            <PrivateRoute />
          </div>
          {/* <ReactQueryDevtools initialIsOpen /> */}
        </QueryClientProvider>
      </Provider>
    </React.Suspense>
  );
}

export default App;
