import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const menus = [
    { name: 'dashboard', link: '/', icon: MdOutlineDashboard },
    { name: 'user', link: '/', icon: AiOutlineUser },
    { name: 'messages', link: '/', icon: FiMessageSquare },
    { name: 'analytics', link: '/', icon: TbReportAnalytics, margin: true },
    { name: 'File Manager', link: '/', icon: FiFolder },
    { name: 'Cart', link: '/', icon: FiShoppingCart },
    { name: 'Saved', link: '/', icon: AiOutlineHeart, margin: true },
    { name: 'Setting', link: '/', icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div>
      <SideBarContainer>이거슨 사이드바입니다</SideBarContainer>
      <section className="flex gap-6">
        {/* <div className="m-3 text-xl text-gray-900 font-semibold">REACT TAILWIND</div> */}
        <div className={`bg-gray-500 min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-black px-4`}>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu) => (
              <Link
                to={menu?.link}
                className={` ${
                  menu?.margin && 'mt-5'
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                <h2 className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && 'hidden'
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const SideBarContainer = styled.div`
  ${tw`bg-gray-400`}
`;
