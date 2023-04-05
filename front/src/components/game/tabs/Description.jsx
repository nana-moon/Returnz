import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { selectedIdx, sellNeedData } from '../../../store/buysellmodal/BuySell.selector';
import { getCompanyCodeList } from '../../../store/buysellmodal/BuySell.reducer';
import { stockdescription } from '../../../store/gamedata/GameData.selector';

export default function Description() {
  const dispatch = useDispatch();
  const description = useSelector(stockdescription);
  const idx = useSelector(selectedIdx);
  const data = useSelector(sellNeedData);
  const key = Object.keys(description);
  // console.log('종목 소개', description, idx, key);

  useEffect(() => {
    if (data !== []) {
      dispatch(getCompanyCodeList(key));
    }
  }, []);
  return (
    <DescriptionContainer>
      <DescriptionImgSection>
        <DescriptionImgBox>
          <img src={description[key[idx]]?.logo} alt="" />
        </DescriptionImgBox>
        <div className="flex flex-col">
          <DescriptionTitleSection>{description[key[idx]].koName}</DescriptionTitleSection>
          <DescriptionIndustrySection>{description[key[idx]].industry}</DescriptionIndustrySection>
        </div>
      </DescriptionImgSection>
      <DescriptionSection>
        <div>
          {description[key[idx]].description ? description[key[idx]].description : '등록된 종목 소개가 없습니다.'}
        </div>
      </DescriptionSection>
    </DescriptionContainer>
  );
}

const DescriptionContainer = styled.div`
  width: 100%;
  ${tw`h-[100%] overflow-y-auto`}
`;

const DescriptionImgSection = styled.div`
  ${tw`flex justify-center items-center`}
`;

const DescriptionImgBox = styled.div`
  max-width: 7%;
  ${tw`border rounded-2xl overflow-hidden`}
`;

const DescriptionTitleSection = styled.div`
  ${tw`font-bold ml-5 text-2xl text-left`}
`;
const DescriptionIndustrySection = styled.div`
  ${tw`ml-5 text-left`}
`;

const DescriptionSection = styled.div`
  ${tw`text-sm mt-4`}
`;
