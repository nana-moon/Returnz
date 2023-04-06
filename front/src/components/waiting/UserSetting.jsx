import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Radio } from '@material-tailwind/react';
import Swal from 'sweetalert2';

export default function UserSetting({ setting, getIsUserSetting, getUserSetting }) {
  // 사용자 설정 데이터
  const handleUserSetting = (e) => {
    const newName = e.target.name;
    let newValue;
    if (newName === 'totalTurn') {
      newValue = parseInt(e.target.value, 10);
    } else {
      newValue = e.target.value;
    }
    const newData = { ...setting, [newName]: newValue };
    getUserSetting(newData);
  };

  // 테마로 돌아가기 위해 구현
  const handleIsUserSetting = () => {
    const newSetting = { ...setting, theme: null, turnPerTime: 'NO', startTime: null, totalTurn: null };
    getUserSetting(newSetting);
    getIsUserSetting();
  };

  // 턴 시작일 달력 설정
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
  const handleDate = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDay();
    if (day === 0 || day === 6) {
      Swal.fire({
        title: `주말은 선택할 수 없습니다/`,
        icon: 'error',
      });
      e.target.value = '';
    }
    handleUserSetting(e);
  };

  return (
    <UserSettingContainer>
      <BackBtn onClick={handleIsUserSetting}>테마보기</BackBtn>
      <TurnDateSection>
        <TurnDateTitle>턴 시작일</TurnDateTitle>
        <TurnDateInput onChange={handleDate} name="startTime" type="date" min="2001-01-01" max={maxDate} />
      </TurnDateSection>
      <TurnPeriodSection>
        <TurnPeriodTitle>턴 단위</TurnPeriodTitle>
        <TurnPeriodForm onChange={handleUserSetting}>
          <Radio id="periodChoice1" name="turnPerTime" value="DAY" />
          <label htmlFor="periodChoice1">1일</label>

          <Radio id="periodChoice2" name="turnPerTime" value="WEEK" />
          <label htmlFor="periodChoice2">1주</label>

          {/* <Radio id="periodChoice3" name="turnPerTime" value="MONTH" />
          <label htmlFor="periodChoice3">한 달</label> */}
        </TurnPeriodForm>
      </TurnPeriodSection>
      <TurnCountSection>
        <TurnCountTitle>턴 수</TurnCountTitle>
        <TurnCountForm onChange={handleUserSetting}>
          <Radio id="contactChoice1" name="totalTurn" value="10" />
          <label htmlFor="contactChoice1">10턴</label>

          <Radio id="contactChoice2" name="totalTurn" value="20" />
          <label htmlFor="contactChoice2">20턴</label>

          {/* <Radio id="contactChoice3" name="totalTurn" value="50" />
          <label htmlFor="contactChoice3">50턴</label> */}
        </TurnCountForm>
      </TurnCountSection>
    </UserSettingContainer>
  );
}
const UserSettingContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[50%] text-lg`}
`;
const BackBtn = styled.button`
  ${tw`w-[100%] h-[25%] hover:bg-blue-gray-50 text-xl font-bold`}
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
