/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import img1 from '../components/tutorial/1.png';
import img2 from '../components/tutorial/2.png';
import img3 from '../components/tutorial/3.png';
import img4 from '../components/tutorial/4.png';
import img5 from '../components/tutorial/5.png';
import img6 from '../components/tutorial/6.png';
import img7 from '../components/tutorial/7.png';
import img8 from '../components/tutorial/8.png';
import img9 from '../components/tutorial/9.png';
import img10 from '../components/tutorial/10.png';
import img11 from '../components/tutorial/11.png';
import img12 from '../components/tutorial/12.png';
import img13 from '../components/tutorial/13.png';
import img14 from '../components/tutorial/14.png';
import img15 from '../components/tutorial/15.png';

export default function TutorialPage() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const imgpath = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];
  const goToMain = () => {
    navigate('/');
  };

  const nextPage = () => {
    if (i >= 14) {
      Swal.fire({
        title: `튜토리얼을 완료하셨습니다`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    } else {
      setI(i + 1);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="h-screen relative" onClick={() => nextPage()}>
      <img src={imgpath[i]} alt="" style={{ width: '100%', height: '100%' }} className="relative" />
      <div
        className="absolute top-6 right-8 bg-gain border text-3xl font-bold text-white rounded-xl px-3 py-2"
        onClick={() => goToMain()}
      >
        {' '}
        X 그만 보기
      </div>
    </div>
  );
}
