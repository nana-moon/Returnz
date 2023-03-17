import React from 'react';
import tw, { styled } from 'twin.macro';

export default function LoginPage() {
  return (
    <>
      <BackSection>Returnz</BackSection>
      <FrontSection>Login</FrontSection>
    </>
  );
}

const BackSection = styled.div`
  width: 1200px;
  height: 600px;
  ${tw`bg-white fixed mt-32 left-20 drop-shadow-2xl rounded-xl`}
`;

const FrontSection = styled.div`
  height: 700px;
  width: 450px;
  ${tw`bg-primary fixed mt-20 left-60 drop-shadow-xl rounded-xl`}
`;
