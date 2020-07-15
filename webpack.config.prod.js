const {merge}=require('webpack-merge');
const CommonConfig=require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports=merge(CommonConfig,{
    mode:'production',
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../'
                    }
                },'css-loader','sass-loader']
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash].css'
        })
    ]
});