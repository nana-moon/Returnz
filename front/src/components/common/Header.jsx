import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃버튼 눌렀을 때 쿠키의 데이터 삭제후 로그인페이지
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('profileIcon');
    Cookies.remove('id');
    Cookies.remove('nickname');
    Cookies.remove('email');
    alert('로그아웃 성공');
    navigate('/login');
  };
  return (
    <div>
      <NavHeader>
        <NavLink to="/">
          <img src="../../logo.png" alt="" className="h-10 mr-2" />
          Returnz
        </NavLink>
        <LogoutLink onClick={handleLogout}>로그아웃</LogoutLink>
      </NavHeader>
    </div>
  );
}

const NavHeader = styled.div`
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // height: 56px;
  ${tw`bg-primary flex justify-between py-2 w-[100%]`}
`;

const NavLink = styled(Link)`
  ${tw`flex text-white font-ibm font-bold text-4xl mx-2`}
`;

const LogoutLink = styled.button`
  ${tw`text-white font-spoq text-lg mx-4 my-2`}
`;
