/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import React from 'react';
import Chart from 'react-apexcharts';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import imgpath from './assets/graphHelp.png';
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
      title: {
        text: '제목',
      },
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
              });
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
      <div className="absolute top-2 left-4 z-10 ">
        <Popover
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="right-start"
        >
          <PopoverHandler>
            <Button variant="gradient" color="white" size="sm" className="border border-negative">
              ?
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-20 border-gray-400 shadow-xl shadow-gray-600">
            <img src={imgpath} alt="" />
          </PopoverContent>
        </Popover>
      </div>
      {selectidx != null && <Chart options={options} series={options.series} height="95%" />}
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  margin-top: 1.25rem;
  max-hegiht: 60%;
  ${tw`border bg-white rounded-xl h-[60%] relative`}
`;
