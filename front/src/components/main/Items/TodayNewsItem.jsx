import React from 'react';
import tw, { styled } from 'twin.macro';

export default function TodayNewsItem({ news }) {
  return (
    <TodayNewsContainer>
      <TitleText>{news.주제}</TitleText>
      <SubTitleText>{news.용어}</SubTitleText>
      <ContentText>{news.주제}</ContentText>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2`}
`;

const TitleText = styled.div`
  ${tw`text-2xl`}
`;

const SubTitleText = styled.div`
  ${tw`text-lg`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
