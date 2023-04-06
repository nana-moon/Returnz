import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NotFoundPage() {
  const navigate = useNavigate();

  Swal.fire({
    title: `잘못된 접근입니다.`,
    text: `메인페이지로 이동합니다`,
    icon: `error`,
    timer: 1000,
    showConfirmButton: false,
  });

  setTimeout(() => {
    navigate('/');
  }, 10);

  return <div>not found</div>;
}
