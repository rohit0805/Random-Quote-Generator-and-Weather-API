const {merge}=require('webpack-merge');
const CommonConfig=require('./webpack.config');

module.exports=merge(CommonConfig,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist'
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    }
});