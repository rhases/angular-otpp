const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
// "angular": "~1.6.0",
// "bootstrap": "~3.3.7",
// "bootstrap-social": "^5.0.0",
// "angular-animate": "~1.6.0",
// "angular-aria": "~1.6.0",
// "angular-resource": "~1.6.0",
// "angular-cookies": "~1.6.0",
// "angular-sanitize": "~1.6.0",
// "angular-ui-bootstrap": "^2.0.1",
// "font-awesome": ">=4.1.0",
// "angular-ui-router": "~0.3.1",
// "angular-validation-match": "^1.9.0",
module.exports = {
  entry: {
    app: './src/bootstrap.ts',
    vendor: ['angular', 'angular-ui-router', 'angular-formly', 'angular-ui-bootstrap'],
  },
  devtool: 'source-map',
  context: path.join(__dirname, '..', 'demo'),
  resolve: {
    extensions: ['.ts', '.webpack.js', '.web.js', '.js'],
    alias: {
      'angular-otpp':  path.join(__dirname, '..', 'src'),
    },
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader?declaration=false'] },
      { test: /\.html$/, use: ['raw-loader'] },
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/',
    filename: 'demo.js',
  },
};
