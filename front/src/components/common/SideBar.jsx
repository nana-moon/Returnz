import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Card, CardHeader, Input, Typography, Avatar } from '@material-tailwind/react';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
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
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(true);
  const [email, setEmail] = React.useState('');
  const onChange = ({ target }: any) => setEmail(target.value);
  return (
    <SideBarContainer>
      <MyProfileCard>
        <Card color="transparent" shadow={false} className="w-full">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-2 flex items-center gap-4 pt-0 pb-4"
          >
            <Avatar size="lg" variant="circular" src="../../profile_pics/green.jpg" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  내 유저네임
                </Typography>
              </div>
              <Typography color="blue-gray">프로필 바꾸기</Typography>
            </div>
          </CardHeader>
        </Card>
      </MyProfileCard>
      <section className="flex gap-6">
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
      </section>
      <FriendSearchContainer>
        <Input
          type="text"
          label="닉네임을 검색하세요"
          color="cyan"
          value={email}
          onChange={onChange}
          className="bg-input"
        />
        <SearchButton>
          <AiOutlineSearch />
        </SearchButton>
      </FriendSearchContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  ${tw`bg-white border-l-2 border-negative`}
`;

const MyProfileCard = styled.div`
  ${tw`border-b-2 border-negative`}
`;

const FriendSearchContainer = styled.div`
  ${tw`flex border-t-2 border-negative px-2 pt-2 gap-2`}
`;

const SearchButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
