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
      <div className="flex justify-between w-[100%] pt-14 h-screen bg-base">
        <div className="flex justify-center w-[80%]">
          <Outlet />
        </div>
        <div className="w-1/5">{pageList.some((page) => page === path) && <SideBar />}</div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
