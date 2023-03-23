import React, { useState } from 'react';

import tw, { styled } from 'twin.macro';

export default function UserSetting({ getIsUser }) {
  const handleIsUser = () => {
    getIsUser();
  };
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
  return (
    <UserSettingContainer>
      <BackBtn onClick={handleIsUser}>테마보기</BackBtn>
      <TurnDateSection>
        <TurnDateTitle>턴 시작일</TurnDateTitle>
        <TurnDateInput type="date" min="2001-01-01" max={maxDate} />
      </TurnDateSection>
      <TurnPeriodSection>
        <TurnPeriodTitle>턴 단위</TurnPeriodTitle>
        <TurnPeriodForm>
          <input type="radio" id="periodChoice1" name="period" value="day" />
          <label htmlFor="periodChoice1">1일</label>

          <input type="radio" id="periodChoice2" name="period" value="week" />
          <label htmlFor="periodChoice2">1주</label>

          <input type="radio" id="periodChoice3" name="period" value="month" />
          <label htmlFor="periodChoice3">한 달</label>
        </TurnPeriodForm>
      </TurnPeriodSection>
      <TurnCountSection>
        <TurnCountTitle>턴 수</TurnCountTitle>
        <TurnCountForm>
          <input type="radio" id="contactChoice1" name="count" value="10" />
          <label htmlFor="contactChoice1">10턴</label>

          <input type="radio" id="contactChoice2" name="count" value="30" />
          <label htmlFor="contactChoice2">30턴</label>

          <input type="radio" id="contactChoice3" name="count" value="50" />
          <label htmlFor="contactChoice3">50턴</label>
        </TurnCountForm>
      </TurnCountSection>
    </UserSettingContainer>
  );
}
const UserSettingContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[50%]`}
`;
const BackBtn = styled.button`
  ${tw`w-[100%] h-[25%] hover:bg-blue-gray-50`}
`;
const TurnDateSection = styled.div`
  ${tw`flex w-[100%] h-[25%]`}
`;

const TurnDateTitle = styled.h1`
  ${tw`border w-[30%] flex justify-center items-center`}
`;

const TurnDateInput = styled.input`
  ${tw`border w-[70%] text-center`}
`;

const TurnPeriodSection = styled.div`
  ${tw`flex w-[100%] h-[25%]`}
`;

const TurnPeriodTitle = styled.h1`
  ${tw`border w-[30%] flex justify-center items-center`}
`;

const TurnPeriodForm = styled.form`
  ${tw`border w-[70%] flex items-center justify-evenly`}
`;

const TurnCountSection = styled.div`
  ${tw`flex w-[100%] h-[25%]`}
`;

const TurnCountTitle = styled.h1`
  ${tw`border w-[30%] flex justify-center items-center`}
`;

const TurnCountForm = styled.form`
  ${tw`border w-[70%] flex items-center justify-evenly`}
`;
