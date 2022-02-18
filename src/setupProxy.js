const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/**', { target: 'https://rentall-challenge-service.herokuapp.com/' }));
};