const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={
    entry:'./src/js/app.js',
    output:{
        filename:'js/[name].[contenthash].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            inject:true,
            template:path.resolve(__dirname,'src','index.html'),
            favicon:'./src/images/day.png'
        }),
        new CleanWebpackPlugin(),
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(png|jpg|jpeg|ico|gif)$/,
                exclude:/node_modules/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[contenthash].[ext]',
                        outputPath:'assets'
                    }
                }
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    }
}