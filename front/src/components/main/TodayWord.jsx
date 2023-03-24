import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';
import wordDummy from './todayWordDummy';

export default function TodayWord() {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [data] = useState(wordDummy);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };
  return (
    <TodayWordContainer>
      <TodayWordTitle>
        오늘의 단어
        <FaBook className="my-auto" />
      </TodayWordTitle>
      <TodayWordCarousel>
        <WordTitle>{data[currentIndex].용어}</WordTitle>
        <WordContent>{data[currentIndex].설명}</WordContent>
        <LeftArrow>
          <BsFillArrowLeftCircleFill onClick={prevSlide} />
        </LeftArrow>
        <RightArrow>
          <BsFillArrowRightCircleFill onClick={nextSlide} />
        </RightArrow>
      </TodayWordCarousel>
    </TodayWordContainer>
  );
}

const TodayWordContainer = styled.div`
  ${tw`text-center p-2`}
`;
const TodayWordTitle = styled.div`
  ${tw`flex text-2xl gap-2 justify-center`}
`;

const TodayWordCarousel = styled.div`
  ${tw`relative bg-white rounded-xl border-2 border-negative p-2`}
`;

const WordTitle = styled.div`
  ${tw`text-lg`}
`;

const WordContent = styled.div`
  ${tw`text-sm mx-10 bg-yellow-200`}
`;

const LeftArrow = styled.div`
  ${tw`absolute top-[50%] -translate-x-0 translate-y-[50%] left-1 text-2xl cursor-pointer`}
`;

const RightArrow = styled.div`
  ${tw`absolute top-[50%] -translate-x-0 translate-y-[50%] right-1 text-2xl cursor-pointer`}
`;
