// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // You can change this to any path you want
    createProxyMiddleware({
      target: 'https://api-web.nhle.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the `/api` prefix when forwarding the request
      },
    })
  );
};