const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack is run using Node, and even though Node now has the capability
// to run EcmaScript modules (.mjs) (import, export default, etc) instead of
// CommonJS (.cjs) (const someCode = require('someCode')) Webpack 5 forces the
// use of CommonJS. This means we must use require and module.exports instead
// of ESM which runs natively in all modern browsers and Node.
// In a Node project's package.json, you are able to set all .js files to be
// treated as ESM instead of CJS with "type": "module", although, this does not
// seem necessary if using Webpack.
//
// The only way to use ESM in the Webpack config would be to use Babel, but
// we don't need Babel since we are using TypeScript.
//
// Webpack automatically detects whether a .js file is JavaScript, EcmaScript,
// or CommonJS without an extension needing to be specified. 

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [],
  },
  module: {
    rules: [
      // css yarn add style-loader css-loader --dev
      {
        test: /\.css$/,
        // these are executed in reverse order
        use: ['style-loader', 'css-loader'],
      },
      // typescript. yarn add ts-loader --dev
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // graphic assets
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // font assets
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // csv, xml, (json is loaded by default already),
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      // yaml, require, and yarn add
      {
        test: /\.ya?ml$/i,
        type: 'json',
        use: 'yaml-loader'
      },
      // Typically, there would be no need to use Babel when we have TypeScript.
      // TypeScript can control out of the box what ES standard it is compiled
      // to.
      // 
      // The only usecase for Babel is being used for Styled Components.
      // The only other use case for Babel I can see is using EcmaScript
      // features which have not yet made it into the latest TypeScript.
      // 
      // If using Babel, make sure to configure and create a babel.config.js
      // Babel
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [],
          },
        },
      },
    ],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
    clean: true,
  },
  plugins: [
    // https://github.com/jantimon/html-webpack-plugin#options
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      // https://stackoverflow.com/questions/10808109/script-tag-async-defer/39992639#39992639
      // https://stackoverflow.com/questions/10808109/script-tag-async-defer/19556555#19556555
      scriptLoading: 'defer',
      inject: 'body',
      // https://stackoverflow.com/a/63216778/8599411
      template: './public/index.html'
    }),
  ],
};
