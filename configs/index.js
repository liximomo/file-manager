if (process.env.NODE_ENV === 'production') {
  module.exports = {
    client: require('./webpack.config.prod'),
    server: require('./webpack.config.server.prod'),
  };
} else {
  module.exports = {
    client: require('./webpack.config.dev'),
    server: require('./webpack.config.server.dev'),
  }
}
