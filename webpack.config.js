'use strict';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const production = process.env.NODE_ENV === 'production';

module.exports = (_, argv) => {
    const config = {
        entry: './src/app.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        mode: production ? 'production' : 'development',
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.join(__dirname, 'src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: !production ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024,
                                name: 'src/[hash].[ext]'
                            }
                        }
                    ]
                },
            ]
        },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin({
                dry: true
            }),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'common.css',
                disable: false,
                allChunks: true
            }),
            new WebpackMd5Hash(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true,
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                }
            })
        ]
    };

    return config;
};
