import { openApi } from './axiosConfig';

const API_KEY = process.env.EXCHANGE_API_KEY;
const getExchangeKrUs = async () => {
  const response = await openApi.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'USD',
      to_currency: 'KRW',
      apikey: `"${API_KEY}"`,
    },
  });
  return response.data['Realtime Currency Exchange Rate'];
};
const getExchangeKrJp = async () => {
  const response = await openApi.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'JPY',
      to_currency: 'KRW',
      apikey: `"${API_KEY}"`,
    },
  });
  return response.data['Realtime Currency Exchange Rate'];
};
const getExchangeKrEu = async () => {
  const response = await openApi.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'EUR',
      to_currency: 'KRW',
      apikey: `"${API_KEY}"`,
    },
  });
  return response.data['Realtime Currency Exchange Rate'];
};
const getExchangeKrBit = async () => {
  const response = await openApi.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'BTC',
      to_currency: 'KRW',
      apikey: `"${API_KEY}"`,
    },
  });
  return response.data['Realtime Currency Exchange Rate'];
};
const getOilPrice = async () => {
  const response = await openApi.get('/query', {
    params: {
      function: 'WTI',
      interval: 'daily',
      apikey: `"${API_KEY}"`,
    },
  });
  return response.data.data[0];
};

export { getExchangeKrUs, getExchangeKrJp, getExchangeKrEu, getExchangeKrBit, getOilPrice };
