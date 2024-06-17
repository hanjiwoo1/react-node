// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// module.exports = function(app) {
//   app.use(
//     '/file',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/posts',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//     })
//   );
// };