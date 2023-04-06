import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import TradeListItem from './TradeListItem';

export default function TradeList({ selectedResult }) {
  const [tradeList, setTradeList] = useState([]);

  useEffect(() => {
    if (selectedResult) {
      setTradeList(selectedResult.trade_list);
      console.log('selectedResult', selectedResult);
    }
  }, [selectedResult]);

  return (
    <TradeListContainer>
      {tradeList.map((trade, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <TradeListItem key={i} trade={trade} />;
      })}
    </TradeListContainer>
  );
}

const TradeListContainer = styled.div`
  ${tw` bg-white h-[180px] overflow-y-auto `}
  ::-webkit-scrollbar {
    display: none;
  }
`;
