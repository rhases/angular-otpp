const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({ filename: "style.css" });

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../dist',
    filename: 'index.js',
    library: 'angular-otpp',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'angular': 'angular',
    'angular': 'angular',
    'angular-animate': 'angular-animate',
    'angular-formly': 'angular-formly',
    'angular-formly-templates-bootstrap': 'angular-formly-templates-bootstrap',
    'lodash': 'lodash',
    'bootstrap-sass': 'bootstrap-sass',
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
    rules: [{
        test: /\.ts$/,
        use: [{
            loader: 'ng-annotate-loader'
          },
          'awesome-typescript-loader?declaration=false'
        ],
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        test: /\.pug$/,
        use: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ],
        })
      }
    ]
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    extractSass
  ]
};
