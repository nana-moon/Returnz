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
  const thisPage = (page) => page === path;
  const showHeader = pageList.some(thisPage) ? <Header /> : null;
  const showSideBar = pageList.some(thisPage) ? <SideBar /> : null;

  return (
    <QueryClientProvider client={queryClient}>
      {showHeader}
      <div className="flex pt-14 justify-between h-screen bg-gray-300">
        <div className="flex justify-center w-[75%]">
          <Outlet />
        </div>
        {showSideBar}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
