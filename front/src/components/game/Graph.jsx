/* eslint-disable func-names */
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
    const minprice = Math.min(
      ...Object.values(stockGraphData[selectidx][companyName].candledata).map((x) => parseInt(x.y[2], 10)),
    );
    const maxprice = Math.max(
      ...Object.values(stockGraphData[selectidx][companyName].candledata).map((x) => parseInt(x.y[1], 10)),
    );

    const categoriess = stockGraphData[selectidx][companyName].candledata.map((data) => data.x);

    options = {
      series: [
        {
          name: '주가',
          type: 'candlestick',
          color: '#FF5454',
          data: stockGraphData[selectidx][companyName].candledata,
          // tooltip: {
          //   custom: [
          //     function cost({ seriesIndex, dataPointIndex, w }) {
          //       const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          //       const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          //       const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          //       const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];

          //       const tmp = `시가 : ${o}<br>고가 : ${h}<br>저가 : ${l}<br>종가 : ${c}`;
          //       return tmp;
          //     },
          //   ],
          // },
        },
        {
          name: '거래량',
          type: 'line',
          color: '#D4D4D4',
          data: stockGraphData[selectidx][companyName].linedata,
          // tooltip: {
          //   custom: [
          //     function idx({ seriesIndex, dataPointIndex, w }) {
          //       return `거래량 : ${w.globals.series[seriesIndex][dataPointIndex]}`;
          //     },
          //   ],
          // },
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
      yaxis: [
        {
          title: {
            text: '주가',
          },
          min: minprice * 0.99,
          max: maxprice * 1.01,
          labels: {
            formatter(value) {
              return value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }); // 세 자리마다 쉼표 추가
            },
          },
        },
        {
          opposite: true,
          title: {
            text: '거래량',
          },
          labels: {
            formatter(value) {
              return value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              });
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        categories: categoriess,
        // title: {
        //   text: '날짜',
        //   style: {
        //     fontSize: '14px', // 원하는 폰트 크기를 지정하세요.
        //     fontWeight: 'bold', // 원하는 폰트 스타일을 지정하세요.
        //     color: '#333333', // 원하는 텍스트 색상을 지정하세요.
        //   },
        // },
        labels: {
          formatter(val) {
            const index = categoriess.indexOf(val);
            return `${index + 1}`;
          },
        },
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
