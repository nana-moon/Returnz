import React from 'react';
import tw, { styled } from 'twin.macro';
import { Progress } from '@material-tailwind/react';

export default function Turn() {
  return (
    <TurnContanier>
      <CountSection>턴 1/12</CountSection>
      {/* <Progress label="남은시간" value={88} color="cyan" /> */}
    </TurnContanier>
  );
}

const TurnContanier = styled.div`
  ${tw`border bg-white rounded-xl h-[8%]`}
`;

const CountSection = styled.div`
  ${tw`text-center`}
`;
