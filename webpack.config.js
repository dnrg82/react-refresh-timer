const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UnusedWebpackPlugin = require('unused-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
  /*   new HtmlWebpackPlugin({
      template: './demo/index.html'
    }),
     new BundleAnalyzerPlugin() */
     new UnusedWebpackPlugin({
      // Source directories
      directories: [path.join(__dirname, 'src')],
      // Exclude patterns
      exclude: ['*.test.js'],
      // Root directory (optional)
      root: __dirname,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /demo/],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo'),
    },
    port: 3000,
    open: true,
  },
};

