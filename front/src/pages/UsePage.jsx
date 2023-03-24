import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import ProfileEditModal from '../components/common/ProfileEditModal';

export default function UsePage() {
  const [modal, setModalOpen] = useState(false);
  const handleModal = (data) => {
    setModalOpen(data);
  };
  return (
    <div>
      {modal === true ? <ProfileEditModal /> : null}
      <Header />
      <div className="flex">
        <div className="w-[100%] flex justify-center">
          <Outlet />
        </div>
        <SideBar onModal={handleModal} />
      </div>
    </div>
  );
}
