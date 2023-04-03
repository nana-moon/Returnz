import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';
import { getTodayWord } from '../../apis/homeApi';

export default function TodayWord() {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [word, setWord] = useState('');
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? word.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === word.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTodayWord();
      setWord(result.data.todayWordList);
    };
    fetchData();
  }, []);
  return (
    <TodayWordContainer>
      <TodayWordCarousel>
        <WordTitle>{word[currentIndex]?.keyWord}</WordTitle>
        <WordContent>{word[currentIndex]?.description}</WordContent>
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

const TodayWordCarousel = styled.div`
  ${tw`relative bg-white w-[100%] h-[100%] rounded-xl border-2 border-negative p-2`}
`;

const WordTitle = styled.div`
  ${tw`text-2xl font-bold text-left mx-10 border-b-2 pb-2 mt-2`}
`;

const WordContent = styled.div`
  ${tw`text-sm ml-11 mr-10 mt-5 text-left indent-4`}
`;

const LeftArrow = styled.div`
  ${tw`absolute top-[50%] translate-y-[50%] left-1 text-2xl cursor-pointer`}
`;

const RightArrow = styled.div`
  ${tw`absolute top-[50%] translate-y-[50%] right-1 text-2xl cursor-pointer`}
`;
