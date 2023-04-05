import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function UnlockResult({ result }) {
  return (
    <UnlockContainer>
      {result &&
        result.newProfiles &&
        result.newProfiles.map((newProfile) => {
          const picPath = `profile_pics/${newProfile}.jpg`;
          return (
            <Avatar key={newProfile} size="xl" variant="circular" src={picPath} className="border-2 border-negative" />
          );
        })}
    </UnlockContainer>
  );
}

const UnlockContainer = styled.div`
  ${tw`border bg-white rounded-xl h-[80%]`}
`;
