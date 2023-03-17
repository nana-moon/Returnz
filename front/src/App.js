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
  const handleHeader = pageList.some(thisPage) ? <Header /> : null;
  const handleSideBar = pageList.some(thisPage) ? <SideBar /> : null;

  return (
    <QueryClientProvider client={queryClient}>
      {handleHeader}
      <div className="flex pt-14 justify-between w-[100%] h-screen bg-base">
        <div className="flex justify-center w-[100%]">
          <Outlet />
        </div>
        {handleSideBar}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
