import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';

export default function UsePage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-[100%] flex justify-center">
          <Outlet />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
