var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var publicPath = "";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var publicPath = '//test.tv.video.qq.com/ktweb/Public/activity/';

module.exports = {
    //页面入口文件配置
    entry: {
        index: './src/index'
    },
    output: {
        path: path.resolve(__dirname, './dest'),
        filename: 'js/[name].bundle.[hash:8].js',
        publicPath: publicPath
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader?minimize'
        }, {
            test: /\.scss$/,
            // loader: 'style-loader!css-loader!sass-loader!postcss-loader'
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: 'images/[name].[ext]?[hash:8]'
                    }
                }
            ]
        }, {
            test: /\.(html)$/,
            loader: 'html-loader?attrs=img:src'
        }, {
            test:/\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    //插件项
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [autoprefixer({
                        browsers: ['last 2 versions', 'Android >= 4.0']
                    })];
                }
            }
        }),
        // 作用域提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 单独抽离 CSS
        new ExtractTextPlugin('css/[name].bundle.[hash:8].css'),
        // 定义全局变量插件
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        // JS 压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 生成最终HTML
        new HtmlWebpackPlugin({
            filename: 'html/index.html',
            template: './src/html/index.html',
            inject: false,
            hash: true,
            minify: {
                //移除HTML中的注释
                removeComments: true, 
                //删除空白符与换行符   
                collapseWhitespace: false 
            }
        })
    ],
    devtool: 'source-map'
};