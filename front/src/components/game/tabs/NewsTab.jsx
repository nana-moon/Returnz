import React from 'react';
import tw, { styled } from 'twin.macro';
import imgPath from '../Items/news.png';

export default function NewsTab() {
  return (
    <TabContanier>
      <ImageBox>
        <a href="http://naver.com" target="_blank" rel="noopener noreferrer">
          <img className="w-[90%]" src={imgPath} alt="" />
        </a>
        <HelpText>이미지 클릭시 원문으로 이동</HelpText>
      </ImageBox>
      <ContentSection>
        <ContentTitle>충격! 공포! 기괴!</ContentTitle>
        <ContentBox>
          뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스
          요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용 뉴스 요약내용
        </ContentBox>
      </ContentSection>
    </TabContanier>
  );
}

const TabContanier = styled.div`
  ${tw`flex relative max-h-[80%]`}
`;

const ImageBox = styled.div`
  ${tw`w-[20%] flex flex-col justify-center items-center`}
`;

const HelpText = styled.div`
  word-wrap: break-word;
  word-break: keep-all;
  ${tw`text-center w-[100%] text-xs opacity-50`};
`;

const ContentSection = styled.div`
  ${tw`flex flex-col ml-8 w-[80%] text-left`}
`;

const ContentTitle = styled.div`
  ${tw`text-2xl font-bold mb-4`}
`;

const ContentBox = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  ${tw``}
`;
