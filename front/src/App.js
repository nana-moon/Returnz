import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/common/Header';
import SideBar from './components/common/SideBar';

function App() {
  const queryClient = new QueryClient();
  const path = window.location.pathname;
  const pageList = ['/', '/waiting', '/profile'];
  return (
    <QueryClientProvider client={queryClient}>
      {pageList.some((page) => page === path) && <Header />}
      <section className="flex justify-between w-[100%]">
        <div className="flex justify-center w-[100%]">
          <Outlet />
        </div>
        {pageList.some((page) => page === path) && <SideBar />}
      </section>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
