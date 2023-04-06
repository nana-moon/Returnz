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
    }
  }, [selectedResult]);
  const data = {
    options: {
      chart: {
        id: 'basic-bar',
        animations: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
        width: 500,
      },
      markers: {
        size: 6,
        colors: '#fff',
        strokeColors: ['#00b7ff'],
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: Array.from({ length: profits.length }, (_, i) => i),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.round(Math.min(...profits)) - 2,
        max: Math.round(Math.max(...profits)) + 2,
        tickAmount: 5,
        tickInterval: 2,
        style: {
          fontWeight: 'bold',
          width: 80,
        },
      },
      grid: {
        borderColor: '#f1f1f1',
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
