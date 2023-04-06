import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

export default function NotFoundPage() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    <Container>
      <Title>잘못된 접근입니다</Title>
      <Subtitle>잠시 후 메인페이지로 이동합니다.</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1cd6c9 0%, #0a768e 100%);
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: float 2s ease-in-out infinite;
  ${tw`animate-pulse text-gain`}
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  ${tw`animate-pulse text-lose`}
`;

const float = css`
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
