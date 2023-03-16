import React from 'react';
import axios from 'axios';

export default function LoginPage() {
  const BASE_URL = 'https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService';
  const STOCK_API_KEY = '/0Y/zkaniy2+tC73CyamDE8z+3h+qVb3NrwYAknpu840lZ8yj8LI86n8hPJlgo7hANYDH2dhgJECoI3ns8nmTg==';
  const response = axios
    .get(BASE_URL, {
      params: {
        serviceKey: `process.env.${STOCK_API_KEY}`,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => {
      console.log('실패함');
    });

  return <div>LoginPage</div>;
}
