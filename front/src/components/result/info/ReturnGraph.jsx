import React from 'react';
import tw, { styled } from 'twin.macro';
import Chart from 'react-apexcharts';

export default function ReturnGraph() {
  const data = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
    series: [
      {
        name: 'return',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 45, 67],
      },
    ],
  };
  return (
    <ReturnGraphContainer>
      <Chart options={data.options} series={data.series} type="line" width="500" height="200" />
    </ReturnGraphContainer>
  );
}

const ReturnGraphContainer = styled.div`
  ${tw` flex justify-center items-center`}
`;
