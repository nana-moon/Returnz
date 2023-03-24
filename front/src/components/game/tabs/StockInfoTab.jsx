/* eslint-disable react/no-array-index-key */
import React from 'react';
import tw, { styled } from 'twin.macro';

export default function StockInfoTab() {
  const data = [
    ['오늘', '1000', '+50', '5%', 10000],
    ['1일 전', '1050', '+25', '2.38%', 15000],
    ['2일 전', '1075', '-10', '-0.93%', 8000],
    ['3일 전', '1065', '+5', '0.47%', 12000],
    ['4일 전', '1070', '-20', '-1.87%', 9000],
    ['5일 전', '1050', '+30', '2.86%', 11000],
  ];

  const getColor = (value) => (value.startsWith('-') ? 'text-lose' : 'text-gain');

  return (
    <div className="">
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader> 과거 날짜 </StyledHeader>
            <StyledHeader> 과거 주가 </StyledHeader>
            <StyledHeader> 과거 대비 </StyledHeader>
            <StyledHeader> 과거 등락 </StyledHeader>
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
  ${tw`table-auto w-full`}
`;

const StyledHeader = styled.th`
  ${tw`border px-4 py-2`}
`;

const StyledCell = styled.td`
  ${tw`border px-4 py-2`}
`;

const StyledRow = styled.tr`
  ${tw`bg-gray-200`}
`;

const UnstyledRow = styled.tr``;
