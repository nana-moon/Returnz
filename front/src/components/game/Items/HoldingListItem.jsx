import React from 'react';
import tw, { styled } from 'twin.macro';
import imgpath from './bear.jpg';

export default function HoldingListItem({ holding }) {
  return (
    <ItemContainer>
      <ItemTitleSection>
        <ItemTitleImgBox>
          <img src={imgpath} alt="dd" />
        </ItemTitleImgBox>
        <CompanyName>{holding.name}</CompanyName>
      </ItemTitleSection>
      <ContentContainer>
        <LeftScetion>
          <p>평가손익</p>
          <p>손익률 </p>
          <p>매입금 </p>
        </LeftScetion>
        <LeftBox>
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </LeftBox>
        <RightSection>
          <p>매도가능</p>
          <p>평균단가</p>
          <p>평가금</p>
        </RightSection>
        <RightBox>
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </RightBox>
      </ContentContainer>
    </ItemContainer>
  );
}
const ItemContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw`bg-negative rounded-xl mx-2 mb-4`}
`;

const ItemTitleSection = styled.div`
  ${tw`ml-2 pt-2 mt-2 items-center w-[95%] flex items-center`}
`;

const ItemTitleImgBox = styled.div`
  ${tw`border-2 h-10 w-10 mr-2 rounded-full overflow-hidden`}
`;

const CompanyName = styled.div`
  width: 40%;

  ${tw`font-bold text-left`}
`;

const LeftScetion = styled.div`
  ${tw`flex-col w-[22.5%] ml-4`}
`;

const LeftBox = styled.div`
  ${tw`flex-col w-[25%]  text-right pr-2`}
`;

const RightSection = styled.div`
  ${tw`flex-col w-[22.5%] border-l pl-2`}
`;

const RightBox = styled.div`
  ${tw`flex-col w-[25%]  text-right pr-2`}
`;

const ContentContainer = styled.div`
  ${tw`flex pb-2`}
`;
