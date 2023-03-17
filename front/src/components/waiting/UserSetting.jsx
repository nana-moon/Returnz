import React, { useState } from 'react';

import tw, { styled } from 'twin.macro';

export default function UserSetting({ getIsUser, getUserSetting }) {
  const init = { date: '', period: '', count: '' };
  const [userSetting, setUserSetting] = useState(init);
  const handleUserSetting = (e) => {
    console.log(e.target.value);
  };
  const handleIsUser = () => {
    getIsUser();
  };
  return (
    <UserSettingContainer>
      <BackBtn onClick={handleIsUser}>테마보기</BackBtn>
      <TurnDateSection>
        <TurnDateTitle>턴 시작일</TurnDateTitle>
        <TurnDateInput type="date" min="2001-01-01" max="2022-12-31" />
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
  ${tw`border-2 border-black w-[50%]`}
`;
const BackBtn = styled.button`
  ${tw`border-2 border-black w-[100%] h-[25%]`}
`;
const TurnDateSection = styled.div`
  ${tw`flex border-2 border-black w-[100%] h-[25%]`}
`;

const TurnDateTitle = styled.h1`
  ${tw`border-2 border-black w-[30%] flex justify-center items-center`}
`;

const TurnDateInput = styled.input`
  ${tw`border-2 border-black w-[70%] flex items-center justify-evenly`}
`;

const TurnPeriodSection = styled.div`
  ${tw`flex border-2 border-black w-[100%] h-[25%]`}
`;

const TurnPeriodTitle = styled.h1`
  ${tw`border-2 border-black w-[30%] flex justify-center items-center`}
`;

const TurnPeriodForm = styled.form`
  ${tw`border-2 border-black w-[70%] flex items-center justify-evenly`}
`;

const TurnCountSection = styled.div`
  ${tw`flex border-2 border-black w-[100%] h-[25%]`}
`;

const TurnCountTitle = styled.h1`
  ${tw`border-2 border-black w-[30%] flex justify-center items-center`}
`;

const TurnCountForm = styled.form`
  ${tw`border-2 border-black w-[70%] flex items-center justify-evenly`}
`;
