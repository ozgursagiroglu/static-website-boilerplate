/* eslint-disable no-undef */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesLoaders = [
  !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader',
];

const isSupporedFile = file =>
  ['.html', '.ejs', '.hbs'].includes(path.extname(file));

const HTMLPages = fs
  .readdirSync(path.resolve(__dirname, 'src'), 'UTF-8')
  .filter(isSupporedFile);

const config = {
  entry: ['./src/js/index.js', './src/css/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: false,
  },
  plugins: HTMLPages.map(
    file =>
      new HtmlWebpackPlugin({
        title: 'Static Website Boilerplate',
        template: `./src/${file}`,
        inject: true,
        minify: false,
        xhtml: true,
        filename: `./${file.replace(path.extname(file), '.html')}`,
      })
  ),
  // Add your plugins here
  // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...stylesLoaders, 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: stylesLoaders,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: isProduction,
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
