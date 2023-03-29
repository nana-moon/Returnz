/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import React from 'react';
import Chart from 'react-apexcharts';
import { stockGraphList } from '../../store/gamedata/GameData.selector';
import { selectedIdx } from '../../store/buysellmodal/BuySell.selector';

export default function Graph() {
  const stockGraphData = useSelector(stockGraphList);
  const selectidx = useSelector(selectedIdx);

  let options = null;
  if (selectidx != null) {
    const companyName = Object.keys(stockGraphData[selectidx]);
    options = {
      series: [
        {
          name: '주가',
          type: 'candlestick',
          color: '#FF5454',
          data: stockGraphData[selectidx][companyName].candledata,
        },
        {
          name: '거래량',
          type: 'line',
          color: '#D4D4D4',
          data: stockGraphData[selectidx][companyName].linedata,
        },
      ],
      chart: {
        height: '100%',
        type: 'line',
      },
      title: {
        text: companyName,
        align: 'middle',
      },
      stroke: {
        width: [1, 1],
      },
      tooltip: {
        style: {
          padding: '8px',
          left: '16px',
          right: '16px',
        },
        custom: [
          function idx({ seriesIndex, dataPointIndex, w }) {
            return `거래량 : ${w.globals.series[seriesIndex][dataPointIndex]}`;
          },
          function cost({ seriesIndex, dataPointIndex, w }) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];

            // template literal로 문자열을 작성하고, \n을 이용해 줄바꿈을 적용합니다.
            const tmp = `시가 : ${o}<br>고가 : ${h}<br>저가 : ${l}<br>종가 : ${c}`;
            return tmp;
          },
        ],
      },
      yaxis: [
        {
          title: {
            text: '주가',
          },
        },
        {
          opposite: true,
          title: {
            text: '거래량',
          },
        },
      ],
      xaxis: {
        type: 'datetime',
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#FF5454',
            downward: '#556BD5',
          },
          wicks: {
            useFillColor: true,
          },
        },
      },
    };
  }
  return (
    <GraphContainer>
      {selectidx != null && <Chart options={options} series={options.series} height="95%" />}
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  margin-top: 1.25rem;
  max-hegiht: 60%;
  ${tw`border bg-white rounded-xl h-[60%]`}
`;
