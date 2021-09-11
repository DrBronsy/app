module.exports = [
  require('./webpack.config.js')('client', 'development'),
  require('./webpack.config.js')('server', 'development'),
];