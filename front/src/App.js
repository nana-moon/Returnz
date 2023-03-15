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
  const pageList = ['/home', '/waiting', '/profile'];
  return (
    <QueryClientProvider client={queryClient}>
      {pageList.some((page) => page === path) && <Header />}
      {pageList.some((page) => page === path) && <SideBar />}
      <Outlet />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
