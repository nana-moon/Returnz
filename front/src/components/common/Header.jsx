import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <NavHeader>
      <NavLink to="/">
        <img src="../../logo.png" alt="" className="h-10 mr-2" />
        Returnz
      </NavLink>
      <LogoutLink>로그아웃</LogoutLink>
    </NavHeader>
  );
}

const NavHeader = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px; */
  ${tw`bg-primary flex justify-between py-2 w-[100%]`}
`;

const NavLink = styled(Link)`
  ${tw`flex text-white font-ibm font-bold text-4xl mx-2`}
`;

const LogoutLink = styled.div`
  ${tw`text-white font-spoq text-lg mx-4 my-2`}
`;
