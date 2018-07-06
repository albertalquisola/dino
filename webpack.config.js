const path = require('path');

const webpackConfig = {
  entry: ['babel-polyfill', path.resolve(__dirname, './public/main')],

  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: 'webpack_bundle.js',
    sourceMapFilename: 'webpack_bundle.js.map',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000 },
        },
      },
      {
        test: /\.jpg$/,
        use: { loader: 'file-loader' },
      },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'appliation/font-woff',
            name: 'fonts/[hash].[ext]',
          },
        },
      },
      { test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/octet-stream',
            name: 'fonts/[hash].[ext]',
          },
        },
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'image/svg+xml',
            name: 'fonts/[hash].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.jpg', '.css',
      '.png', 'woff', '.ttf', '.eot', '.svg'],
    modules: [
      path.resolve(__dirname, './public'),
      path.resolve(__dirname),
      'node_modules',
    ],
  },

  watchOptions: {
    poll: true,
  },

  devtool: 'inline-source-map',

  stats: {
    colors: true,
    reasons: true,
  },
};

module.exports = webpackConfig;

