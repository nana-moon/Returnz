import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Chart from 'react-apexcharts';

export default function ReturnGraph({ selectedResult }) {
  const [profits, setProfits] = useState([]);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    if (selectedResult) {
      const newProfits = selectedResult.profits.map((profit) => {
        return profit.totalProfitRate;
      });
      setProfits(newProfits);
      console.log('selectedResult', selectedResult);
    }
  }, [selectedResult]);
  const data = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: 10,
      },
    },
    series: [
      {
        name: 'return',
        data: profits,
      },
    ],
  };
  return (
    <ReturnGraphContainer>
      <Chart options={data.options} series={data.series} type="line" width="500" height="180" />
    </ReturnGraphContainer>
  );
}

const ReturnGraphContainer = styled.div`
  ${tw` flex justify-center items-center h-[180px]`}
`;
