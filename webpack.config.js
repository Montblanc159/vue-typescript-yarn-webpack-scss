const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dev = process.env.NODE_ENV === "development"

let config = {
  mode: dev ? "development" : "production",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: dev ? '[name].js' : '[name].[chunkhash:8].js'
  },
  devtool: dev ? "cheap-module-eval-source-map" : "source-map",
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@css': path.resolve('./src/scss/'),
      '@vue': path.resolve('./src/vue/'),
      '@vue-template': path.resolve('./src/vue/templates/'),
      '@js': path.resolve('./src/js/')
    }
  },
  devServer: {
    stats: 'minimal'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'eslint-loader'
      },
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
      },
      {
        test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              limit: 8192
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: !dev
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].css"
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: true
  }))
  config.plugins.push(new ManifestPlugin())
  config.plugins.push(new CleanWebpackPlugin({
    verbose: true
  }))
}

module.exports = config
