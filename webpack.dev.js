const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports={
    mode:'development',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8082
      },
    module:{
        rules:[
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
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
      
            {
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.(png|svg|jpg)$/,
                use: [
                  'file-loader']
            },
            {
                test: /\.(gif|ttf|eot|svg|woff2?)$/,
                use: 'url-loader?name=[name].[ext]',
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'src','index.html')
        })
    ]
}