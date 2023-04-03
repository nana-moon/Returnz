import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import Chart from 'react-apexcharts';
// import TodayTopUserItem from './Items/TodayTopUserItem';
import { useQuery } from 'react-query';
import { getTopTenRank } from '../../apis/homeApi';

export default function TodayTopUser() {
  // const [topTenUsers, setTopTenUsers] = useState([]);
  const [chartData, setChartData] = useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await getTopTenRank();
  //     setTopTenUsers(res);
  //   }
  //   fetchData();
  // }, []);
  // 내가 받은 친구요청 리스트
  const { data: topTenUsers } = useQuery({
    queryKey: ['topTenUsers'],
    queryFn: () => getTopTenRank(),
    onError: (e) => {
      console.log(e);
    },
  });
  useEffect(() => {
    if (topTenUsers.length > 0) {
      const userNicknames = topTenUsers.map((data) => data.nickname);
      const userProfit = topTenUsers.map((data) => data.avgProfit);
      if (userNicknames && userProfit) {
        const chartOptions = {
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 6,
            },
          },
          fill: {
            colors: ['#13ADA2'],
            opacity: 0.8,
          },
          grid: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            title: {
              text: '평균수익률',
            },
            categories: userNicknames,
          },
          labels: {
            rotate: 45,
          },
          yaxis: {
            title: {
              text: '수익률 TOP 10',
            },

            // labels: {
            //   // formatter(val) {
            //   //   const user = topTenUsers[val - 1];
            //   //   return `${user?.nickname}`;
            //   // },
            // },
          },
        };

        const chartSeries = [
          {
            name: 'Profit',
            data: userProfit,
          },
        ];

        setChartData({ options: chartOptions, series: chartSeries });
      }
    }
  }, [topTenUsers]);
  // const userNicknames = topTenUsers?.map((data) => data.nickname);
  // // const userProfile = topTenUsers?.map((data) => data.profileIcon);
  // const userProfit = topTenUsers?.map((data) => data.avgProfit);

  return (
    <TopUserContainer>
      <TopUserTitle>수익률 TOP 10</TopUserTitle>
      {/* <GraphContainer>
        {chartData && <Chart options={chartData.options} series={chartData.series} type="bar" />}
      </GraphContainer> */}
      {/* <TopUserBox>
        {topTenUsers?.map((person, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TodayTopUserItem person={person} key={i} />;
        })}
      </TopUserBox> */}
    </TopUserContainer>
  );
}

const TopUserContainer = styled.div`
  ${tw`justify-center`}
`;

const TopUserBox = styled.div`
  ${tw`w-[100%] h-[100%]`}
`;

const TopUserTitle = styled.div`
  ${tw`text-3xl text-center mb-4`}
`;
const GraphContainer = styled.div`
  margin-top: 1.25rem;
  max-hegiht: 60%;
  ${tw`border bg-white rounded-xl h-[60%]`}
`;
