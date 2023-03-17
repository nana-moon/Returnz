/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
import tw, { styled } from 'twin.macro';
import { React, useState } from 'react';
import Chart from 'react-apexcharts';

import data from './data.jsx';

export default function Graph() {
  const [datas] = useState(data);
  const stockdata = [];
  const Volumedata = [];
  datas.map((stock, i) => {
    const tmp = { x: new Date(stock.Date), y: [stock.Open, stock.High, stock.Low, stock.Close] };
    const tmp2 = { x: new Date(stock.Date), y: stock.Volume };
    stockdata.push(tmp);
    Volumedata.push(tmp2);
    return 0;
  });
  console.log(stockdata);

  const options = {
    series: [
      // {
      //   name: '거래량',
      //   type: 'line',
      //   data: Volumedata,
      // },
      // [
      //   {
      //     x: new Date('2023-03-10'),
      //     y: 32,
      //   },
      //   {
      //     x: new Date('2023-03-11'),
      //     y: 64,
      //   },
      //   {
      //     x: new Date('2023-03-12'),
      //     y: 152,
      //   },
      //   {
      //     x: new Date('2023-03-14'),
      //     y: 221,
      //   },
      //   {
      //     x: new Date('2023-03-15'),
      //     y: 32,
      //   },
      //   {
      //     x: new Date('2023-03-16'),
      //     y: 88,
      //   },
      //   {
      //     x: new Date('2023-03-17'),
      //     y: 66,
      //   },
      //   {
      //     x: new Date('2023-03-18'),
      //     y: 30,
      //   },
      // ],
      {
        name: '주가',
        type: 'candlestick',
        data: stockdata,
        // {
        //   x: new Date('2023-03-10'),
        //   y: [6629.81, 6650.5, 6623.04, 6633.33],
        // },
        // {
        //   x: new Date('2023-03-11'),
        //   y: [6632.01, 6643.59, 6620, 6630.11],
        // },
        // {
        //   x: new Date('2023-03-12'),
        //   y: [6630.71, 6648.95, 6623.34, 6635.65],
        // },
        // {
        //   x: new Date('2023-03-13'),
        //   y: [6635.65, 6651, 6629.67, 6638.24],
        // },
        // {
        //   x: new Date('2023-03-14'),
        //   y: [6638.24, 6640, 6620, 6624.47],
        // },
        // {
        //   x: new Date('2023-03-15'),
        //   y: [6624.53, 6636.03, 6621.68, 6624.31],
        // },
        // {
        //   x: new Date('2023-03-16'),
        //   y: [6624.61, 6632.2, 6617, 6626.02],
        // },
        // {
        //   x: new Date('2023-03-17'),
        //   y: [6627, 6627.62, 6584.22, 6603.02],
        // },
        // {
        //   x: new Date('2023-03-18'),
        //   y: [6605, 6608.03, 6598.95, 6604.01],
        // },
      },
    ],
    chart: {
      height: 100,
      type: 'line',
    },
    title: {
      text: '종목이름',
      align: 'middle',
    },
    stroke: {
      width: [1, 1],
    },
    tooltip: {
      shared: true,
      custom: [
        function idx({ seriesIndex, dataPointIndex, w }) {
          return w.globals.series[seriesIndex][dataPointIndex];
        },
        function cost({ seriesIndex, dataPointIndex, w }) {
          console.log(datas[0]);
          const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          const tmp = `시가: ${o}\n
          고가: ${h}\n
          저가: ${l}\n
          종가: ${c}`;
          return tmp;
        },
      ],
    },
    xaxis: {
      type: 'datetime',
    },
  };
  return (
    <GraphContainer>
      <Chart options={options} series={options.series} />
      {/* {datas.map((stock, i) => {
        return (
          <div key={i}>
            날짜 : {stock.Date}
            시가 : {stock.Open}
            종가 : {stock.Close}
            고가 : {stock.High}
            저가 : {stock.Low}
          </div>
        );
      })} */}
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  ${tw`border row-span-6 bg-white rounded-xl`}
`;
