import React from 'react';
import tw, { styled } from 'twin.macro';
import NullListItem from '../../waiting/NullListItem';
import RankListItem from './RankListItem';

export default function ResultRank({ result }) {
  return (
    <RankContainer>
      {Array.from({ length: 4 }).map((_, i) => {
        if (i < result.length) {
          return <RankListItem key={result[i].id} user={result[i]} />;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <NullListItem key={i} />;
      })}
    </RankContainer>
  );
}

const RankContainer = styled.div`
  ${tw`flex flex-col justify-evenly`}
`;
