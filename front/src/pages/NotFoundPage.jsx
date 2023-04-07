import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import tw, { styled, css } from 'twin.macro';

export default function NotFoundPage() {
  const navigate = useNavigate();

  Swal.fire({
    title: `잘못된 접근입니다.`,
    text: `잠시 후 메인페이지로 이동합니다.`,
    icon: 'error',
    timer: 5000,
    showConfirmButton: false,
  });
  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    <Container>
      <Subtitle>잠시 후 메인페이지로 이동합니다...</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f4f6 0%, #b7c1d1 100%);
  overflow: hidden;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  ${tw`text-lose`}
`;
