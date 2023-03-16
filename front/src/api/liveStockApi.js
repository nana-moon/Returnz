import axios from 'axios';

const BASE_URL = 'http://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex';

const response = axios.get(URL, {
  params: {
    serviceKey: process.env.REACT_APP_API_KEY,
    numOfRows: 1,
    pageNo: 10,
  },
});
