/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// POST CSS PLUGINS
const postcssPresetEnv = require('postcss-preset-env');
const importCSS = require('postcss-import');
const hexrgba = require('postcss-hexrgba');

const developmentEnvironment = process.env.NODE_ENV === 'development';
const productionEnvironment = process.env.NODE_ENV === 'production';

module.exports = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    open: true,
    overlay: true,
    hot: true,
    stats: {
      assets: false,
      builtAt: true,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      colors: true,
      depth: false,
      entrypoints: false,
      env: true,
      errors: true,
      errorDetails: true,
      errorStack: true,
      hash: true,
      logging: false,
      outputPath: false,
      performance: true,
      reasons: false,
      source: false,
      timings: false,
      usedExports: false,
      version: true,
      warnings: true,
      chunkRelations: false,
    },
    index: 'index.html',
    historyApiFallback: true,
    proxy: {
      '/upload': 'http://localhost:8081',
    },
  },
  mode: productionEnvironment ? 'production' : 'development',
  entry: ['react-hot-loader/patch', './src/app.js'],
  output: {
    path: productionEnvironment
      ? `${__dirname}/dist/browser`
      : `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: './chunks/[name].js',
  },
  stats: {
    colors: true,
    errorDetails: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: developmentEnvironment,
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/assets', to: 'assets' },
    ]),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.ejs'),
    }),
    productionEnvironment
      ? new ExtractTextPlugin({
          filename: 'main.css',
        })
      : new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      productionEnvironment
        ? {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              use: [
                'css-loader?sourceMap',
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins() {
                      return [
                        importCSS(),
                        postcssPresetEnv({
                          stage: 2,
                          browsers: [
                            '> 1%',
                            'last 2 versions',
                            'Firefox ESR',
                            'Opera 12.1',
                            'Safari 7',
                            'ie 9',
                          ],
                          features: {
                            'custom-properties': {
                              importFrom: './src/css/variables.css',
                              preserve: false,
                            },
                          },
                        }),
                        hexrgba(),
                      ];
                    },
                  },
                },
              ],
            }),
          }
        : {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins() {
                    return [
                      importCSS(),
                      postcssPresetEnv({
                        stage: 2,
                        browsers: [
                          '> 1%',
                          'last 2 versions',
                          'Firefox ESR',
                          'Opera 12.1',
                          'Safari 7',
                          'ie 9',
                        ],
                        features: {
                          'custom-properties': {
                            importFrom: './src/css/variables.css',
                            preserve: false,
                          },
                        },
                      }),
                      hexrgba(),
                    ];
                  },
                },
              },
            ],
          },
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                        'Opera 12.1',
                        'Safari 7',
                        'ie 9',
                      ],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
              ],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        issuer: /\.css$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        issuer: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                        'Opera 12.1',
                        'Safari 7',
                        'ie 9',
                      ],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  target: 'web',
};
