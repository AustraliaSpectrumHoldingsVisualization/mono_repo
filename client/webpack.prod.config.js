const common = require('./webpack.common.config.js');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  ...common,
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
