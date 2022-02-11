const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';
const plugins = [
    new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    new CopyWebpackPlugin(
        {
            patterns: [
                {from: 'assets', to: 'assets'}
            ]
        }
    ),
    new webpack.ProvidePlugin(
        {
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }
    ),
    new HtmlWebpackPlugin({
        title: 'index',
        filename: 'index.html',
        template: 'html/index_template.html',
        minify: false,
        chunks: ['vendor', 'index']
    }),
    new HtmlWebpackPlugin({
        title: 'about',
        filename: 'about.html',
        template: 'pug/about.pug', //使用pug樣板
        minify: false,
        chunks: ['vendor', 'about']
    }),
];

module.exports = {
    mode: process.env.NODE_ENV,
    // 未編譯路徑
    context: path.resolve(__dirname, 'src'),
    // 解析路徑
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('src/js'),
            path.resolve('src/css'),
            path.resolve('node_modules')
        ],
        extensions: ['.js'] //引入時可省略副檔名
    },
    // 入口
    entry: {
        index: './js/index.js',
        about: './js/about.js'
    },
    // 打包設定
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js?[hash:8]'
    },
    // 打包優化，將依賴套件打包至vendor.js
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.(pug)$/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true //不壓縮html
                        }
                    },
                ]
            },
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader", 'postcss-loader'], //透過JS讀取CSS
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false //url-loader功能異常，直接使用assets目錄
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            },
            // html-webpack-plugin取代
            // {
            //     test: /\.html$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[path][name].html'
            //             }
            //         }
            //     ],
            // },
            {
                test: /\.(jpg|jpeg|png|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                          
                        }
                    },
                ],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
    },
}