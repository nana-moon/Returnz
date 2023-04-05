import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import Swal from 'sweetalert2';
import { getStockDetail } from '../../../apis/homeApi';

export default function TodayNewsItem({ stock }) {
  const handleModal = async () => {
    const response = await getStockDetail(stock.stockCode);
    console.log(response);
    Swal.fire({
      title: `${response.company.koName}`,
      imageUrl: `${response.company.logo}`,
      imageWidth: 200,
      text: `${response.company.description}`,
      showCloseButton: true,
      confirmButtonText: '정보 보기',
    }).then(() => {
      Swal.fire({
        title: '하하',
      });
    });
  };
  return (
    <TodayNewsContainer onClick={handleModal}>
      <Avatar size="xl" variant="circular" src={stock.logo} className=" border-2 border-negative" />
      <TitleText>{stock.stockName}</TitleText>
      <ContentText>{stock.stockCode}</ContentText>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`bg-white hover:bg-negative rounded-lg py-1 px-2`}
`;

const TitleText = styled.div`
  ${tw`text-lg font-bold`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
