import axios from 'axios';

const STOCK_API_KEY = '';
const BASE_URL = '/getStockMarketIndex';

axios
  .get(`/api${BASE_URL}`, {
    params: {
      serviceKey: STOCK_API_KEY,
      resultType: 'json',
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
