import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import ProfileEditModal from '../components/common/ProfileEditModal';
import { editModalState } from '../store/profileeditmodal/ProfileEdit.selector';

export default function UsePage() {
  const modal = useSelector(editModalState);
  return (
    <div>
      {modal === true ? <ProfileEditModal /> : null}
      <Header />
      <div className="flex pt-14">
        <div className="w-[100%] flex justify-center">
          <Outlet />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
