const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', { target: 'http://[::1]:8090/' }));
    app.use(createProxyMiddleware('/public', { target: 'http://[::1]:8090/' }));
};