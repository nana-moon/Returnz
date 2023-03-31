/* eslint-disable react/no-array-index-key */
import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { stockInformation, stockDataList } from '../../../store/gamedata/GameData.selector';
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
    ['오늘', parseInt(todayInfo.close, 10).toLocaleString(), '+50', '5%', viewInfo[0].volume],
    ['1일 전', viewInfo[0].historyPrice, '+25', '2.38%', viewInfo[0].volume],
    ['2일 전', viewInfo[1].historyPrice, '-10', '-0.93%', viewInfo[1].volume],
    ['3일 전', viewInfo[2].historyPrice, '+5', '0.47%', viewInfo[2].volume],
    ['4일 전', viewInfo[3].historyPrice, '-20', '-1.87%', viewInfo[3].volume],
    ['5일 전', viewInfo[4].historyPrice, '+30', '2.86%', viewInfo[4].volume],
  ];

  const getColor = (value) => (value.startsWith('-') ? 'text-lose' : 'text-gain');

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
            const Row = rowIndex % 2 === 0 ? StyledRow : UnstyledRow;
            const colorClass = getColor(row[2]);
            return (
              <Row key={rowIndex}>
                <StyledCell>{row[0]}</StyledCell>
                <StyledCell className={colorClass}>{row[1].toLocaleString()}</StyledCell>
                <StyledCell className={colorClass}>{row[2]}</StyledCell>
                <StyledCell className={colorClass}>{row[3]}</StyledCell>
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
  ${tw`table-auto w-full text-xs`}
`;

const StyledHeader = styled.th`
  ${tw`border px-4 py-1`}
`;

const StyledCell = styled.td`
  ${tw`border px-4`}
`;

const StyledRow = styled.tr`
  ${tw`bg-gray-200`}
`;

const UnstyledRow = styled.tr``;
