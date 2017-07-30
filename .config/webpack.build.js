const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../bundles',
    filename: 'angular-otpp.umd.js',
    libraryTarget: 'umd',
    library: 'angular-otpp'
  },
  externals: [
    /^\@angular\//,
    /^rxjs\//
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader?declaration=false'],
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
