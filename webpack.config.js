/**
 * Created by Rains
 * on 2016-10-20.
 */
 var path = require('path');
var webpack = require('webpack');
// var WebpackDevServer = require("webpack-dev-server");

// var CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
// var ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
// var MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
// var BUILD_PATH = path.join(ROOT_PATH, './build'); // 最后输出放置公共资源的目录

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: "http://localhost:8088/build/"
    },

    //热部署相关配置
    devServer: {
        historyApiFallback: true,
        contentBase: "./",   //服务器目录 
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        host: 'localhost',
        port: '8088'
    },

    plugins: [
        //new webpack.HotModuleReplacementPlugin()
        //提取公共部分资源
        // new webpack.optimize.CommonsChunkPlugin({
        //     // 与 entry 中的 vendors 对应
        //     name: 'vendors',
        //     // 输出的公共资源名称
        //     filename: 'common.bundle.js',
        //     // 对所有entry实行这个规则
        //     minChunks: Infinity
        // }),
        // 把jquery作为全局变量插入到所有的代码中
        // 然后就可以直接在页面中使用jQuery了
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        //生成index.html页面
        new HtmlWebpackPlugin({
            title: 'rains',
            filename: 'index.html',
            template:'index.html',      //按照此文件内容生成index.html
            inject: 'body',
            //favicon:'./images/logo-small.png',           //自定义logo
            minify: false,
            hash: true,
            cache: false,
            showErrors: false

        })
    ],

    module: {
	loaders: [
		{
			  test: /\.jsx?$/,
			  exclude: /node_modules/,
			  loader: 'babel',
			  query: {
			    presets: ['es2015','react']
			  }
		},
		{
			   test: /\.(png|jpg|gif)$/,
			   loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像 大于这个尺寸的图片会拷贝到build目录下
		},
		{
			 test: /\.css$/,
			 loader: 'style!css'
		}
	]
  }
}