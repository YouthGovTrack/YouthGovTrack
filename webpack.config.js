const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
      clean: true,
      // Enable caching
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    // Enable caching
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    // Optimization settings
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
      usedExports: true,
      sideEffects: false,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', 
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                !isProduction && require.resolve('react-refresh/babel')
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb - inline small images
            },
          },
          generator: {
            filename: 'images/[name].[contenthash][ext]',
          },
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
                titleProp: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      !isProduction && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: '.', globOptions: { ignore: ['**/index.html'] } },
        ],
      }),
      ...(isProduction ? [
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
        }),
        new ImageminPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          pngquant: {
            quality: '65-90',
          },
          mozjpeg: {
            progressive: true,
            quality: 75,
          },
          svgo: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        }),
      ] : []),
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true, // Handle SPA routing
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching during development
      },
      client: {
        overlay: true, // Show errors as overlay
        progress: true, // Show compilation progress
      },
    },
  };
};
