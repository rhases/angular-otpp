const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../dist',
    filename: 'index.js',
    library: 'angular-otpp',
    libraryTarget: 'commonjs2'
  },
  // externals: [
  //   /^\@angular\//,
  //   /^rxjs\//
  // ],
  externals: {
    'angular': 'angular',
    'angular-formly': 'angular-formly',
    'lodash': 'lodash',
    'api-check': {
      root: 'apiCheck',
      amd: 'api-check',
      commonjs2: 'api-check',
      commonjs: 'api-check'
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'ng-annotate-loader' },
          'awesome-typescript-loader?declaration=false'
          ],
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new ModuleConcatenationPlugin(),
  ]
};
