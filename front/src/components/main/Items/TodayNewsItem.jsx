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
      imageWidth: 160,
      imageHeight: 160,
      text: `${response.company.description}`,
      showCloseButton: true,
      confirmButtonText: '재무 정보 보기',
      confirmButtonColor: '#1CD6C9',
      confirm: {
        value: 'next',
      },
    }).then((value) => {
      console.log(value);
      if (value.isConfirmed === true) {
        Swal.fire({
          title: `${response.company.koName}`,
          imageUrl: `${response.company.logo}`,
          imageWidth: 160,
          imageHeight: 160,
          showCloseButton: true,
          showConfirmButton: false,
          html: `
          섹터: ${response.company.sector} 
          <br> 
          산업군: ${response.company.industry} 
          <br>
          종목코드: ${response.company.companyCode}
          <br>
          <br>
          <b>${response.financial.dateTime}의 재무 정보</b>
          <br>
          총자본: ${response.financial.totalCapitalization}
          <br>
          총자산: ${response.financial.totalAssets}
          <br>
          총부채: ${response.financial.totalDebt}
          `,
        });
      } else {
        Swal.close();
      }
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
