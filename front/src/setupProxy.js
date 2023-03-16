const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://apis.data.go.kr/1160100/service/GetMarketIndexInfoService',
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
