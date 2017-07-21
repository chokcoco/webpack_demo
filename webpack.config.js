var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var host = '127.0.0.1';
var port = '8080';
var publicPath = 'http://' + host + ':' + port + '/';

module.exports = {
    //页面入口文件配置
    entry: {
        index: './src/index',
        app: './src/app'
    },
    output: {
        path: path.resolve(__dirname, './dest'),
        filename: 'js/[name].bundle.js',
        publicPath: publicPath
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 2048,
                    name: 'images/[name].[ext]?[hash]'
                }
            }]
        }, {
            test: /\.(html)$/,
            loader: 'html-loader?attrs=img:src'
        }, {
            test: /\.(js)$/,
            exclude: /(node_modules|lib)/,
            use: [
                "babel-loader",
                "eslint-loader"
            ],
        }]
    },
    //插件项
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer({
                        browsers: ['last 2 versions', 'Android >= 4.0'],
                        //是否美化属性值 默认：true 
                        cascade: true,
                        //是否去掉不必要的前缀 默认：true 
                        remove: true
                    })];
                } 
            }
        }),
        // 提取代码中的公共模块
        new webpack.optimize.CommonsChunkPlugin({  
            name: "commons",
            filename: "js/common/commons.js"
            // Only use these entries
            // chunks: ["app", "index"]
        }),
        // 作用域提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 代码热替换
        new webpack.HotModuleReplacementPlugin(),
        // 允许错误不打断程序
        new webpack.NoEmitOnErrorsPlugin(),
        // 单独抽离 CSS
        new ExtractTextPlugin('css/[name].bundle.css'),
        // 生成最终HTML
        new HtmlWebpackPlugin({
            filename: 'html/index.html',
            template: './src/html/index.html',
            inject: false,
            hash: true,
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 删除空白符与换行符   
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'html/app.html',
            template: './src/html/app.html',
            inject: false,
            hash: true,
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 删除空白符与换行符   
                collapseWhitespace: false
            }
        })
    ],
    devtool: 'source-map',
    devServer: {
        host: host,
        port: port,
        // gzip
        compress: true,
        // 不跳转
        historyApiFallback: false,
        // 实时刷新
        inline: true,
        // 隐藏 webpack 包 bundle 信息，错误和警告仍然会显示。
        noInfo: false
    }
};