const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizerCssWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports ={
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizerCssWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test:/\.html$/,
        use:['html-loader']
    },
    {
        test:/\.js$/,
        exclude: /node_modules/,
        use:['babel-loader']
    },   
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },  

    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin()
  ]
}