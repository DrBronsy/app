module.exports = [
  require('./webpack.config.js')('client', 'production'),
  require('./webpack.config.js')('server', 'production'),
];