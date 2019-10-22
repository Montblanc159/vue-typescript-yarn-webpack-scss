const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dev = process.env.NODE_ENV === "development"


let config = {
  mode: dev ? "development" : "production",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'main.js'
  },
  devtool: dev ? "cheap-module-eval-source-map" : "source-map",
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  devServer: {
    noInfo: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      { test: /\.html$/, use: "vue-template-loader"},
      {
        test: /\.scss$/,
        use: [
          dev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 versions', 'ie > 8']
                }),
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: true
  }))
}

module.exports = config
