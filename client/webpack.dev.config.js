const common = require('./webpack.common.config.js');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    static: {
      directory: './public'
    },
    compress: true,
    port: 9000,
  },
};
