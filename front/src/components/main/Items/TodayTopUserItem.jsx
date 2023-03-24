import React from 'react';
import tw, { styled } from 'twin.macro';

export default function TodayTopUserItem({ person }) {
  return (
    <TodayNewsContainer>
      <TitleText>{person.주제}</TitleText>
      <SubTitleText>{person.용어}</SubTitleText>
      <ContentText>{person.주제}</ContentText>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2 my-2 flex`}
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
