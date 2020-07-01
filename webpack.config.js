const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      { 
        test: /\.css$/i, 
        use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
    }),
    new Dotenv()
  ]
};