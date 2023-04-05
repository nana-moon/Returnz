/* eslint-disable react/no-array-index-key */
import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { stockDataList, stockInformation } from '../../../store/gamedata/GameData.selector';
import { selectedIdx } from '../../../store/buysellmodal/BuySell.selector';

export default function StockInfoTab() {
  const stockInfo = useSelector(stockInformation);
  const stockToday = useSelector(stockDataList);
  const Idx = useSelector(selectedIdx);

  const keys = Object.keys(stockInfo);
  const viewInfo = stockInfo[keys[Idx]];
  const todayInfo = stockToday[keys[Idx]][stockToday[keys[Idx]].length - 1];

  console.log(stockInfo[keys[Idx]], todayInfo);
  const data = [
    [
      '오늘',
      viewInfo[4].historyPrice,
      viewInfo[4].historyPrice - viewInfo[3].historyPrice,
      (((viewInfo[4].historyPrice - viewInfo[3].historyPrice) / viewInfo[3].historyPrice) * 100).toFixed(2),
      '',
    ],
    [
      '1일 전',
      viewInfo[3].historyPrice,
      viewInfo[3].historyPrice - viewInfo[2].historyPrice,
      (((viewInfo[3].historyPrice - viewInfo[2].historyPrice) / viewInfo[2].historyPrice) * 100).toFixed(2),
      viewInfo[4].volume,
    ],
    [
      '2일 전',
      viewInfo[2].historyPrice,
      viewInfo[2].historyPrice - viewInfo[1].historyPrice,
      (((viewInfo[2].historyPrice - viewInfo[1].historyPrice) / viewInfo[1].historyPrice) * 100).toFixed(2),
      viewInfo[3].volume,
    ],
    [
      '3일 전',
      viewInfo[1].historyPrice,
      viewInfo[1].historyPrice - viewInfo[0].historyPrice,
      (((viewInfo[1].historyPrice - viewInfo[0].historyPrice) / viewInfo[0].historyPrice) * 100).toFixed(2),
      viewInfo[2].volume,
    ],
    [
      '4일 전',
      viewInfo[0].historyPrice,
      viewInfo[0].historyDiff,
      (
        ((viewInfo[0].historyPrice - (viewInfo[0].historyPrice - viewInfo[0].historyDiff)) /
          (viewInfo[0].historyPrice - viewInfo[0].historyDiff)) *
        100
      ).toFixed(2),
      viewInfo[0].volume,
    ],
  ];

  const getColor = (value) => {
    if (value > 0) {
      return 'text-gain';
    }
    if (value < 0) {
      return 'text-lose';
    }
    return 'text-black';
  };

  return (
    <div className="">
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader> 날짜 </StyledHeader>
            <StyledHeader> 주가 </StyledHeader>
            <StyledHeader> 대비 </StyledHeader>
            <StyledHeader> 등락 </StyledHeader>
            <StyledHeader> 거래량 </StyledHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const Row = rowIndex % 2 === 1 ? StyledRow : UnstyledRow;
            const colorClass = getColor(parseFloat(row[2]));
            return (
              <Row key={rowIndex}>
                <StyledCell>{row[0]}</StyledCell>
                <StyledCell className={colorClass}>
                  {Number.isInteger(row[1]) ? parseInt(row[1], 10) : parseFloat(row[1]).toFixed(2)}
                </StyledCell>
                <StyledCell className={colorClass}>
                  {Number.isInteger(row[2]) ? parseInt(row[2], 10) : parseFloat(row[2]).toFixed(2)}
                </StyledCell>
                <StyledCell className={colorClass}>{row[3]}%</StyledCell>
                <StyledCell>{row[4].toLocaleString()}</StyledCell>
              </Row>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

const StyledTable = styled.table`
  ${tw`table-auto w-full text-sm h-[100%] overflow-y-scroll`}
`;

const StyledHeader = styled.th`
  ${tw`border-b-2 border bg-negative px-4 py-2`}
`;

const StyledCell = styled.td`
  ${tw`border px-4`}
`;

const StyledRow = styled.tr`
  ${tw`bg-gray-200`}
`;

const UnstyledRow = styled.tr``;
