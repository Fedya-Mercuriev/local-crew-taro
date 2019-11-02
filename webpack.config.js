'use strict';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (_, argv) => {
    const config = {
        entry: './src/app.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.join(__dirname, 'src'),
                'Components': path.resolve(__dirname, "src/components")
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
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
                            loader: argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['node_modules/normalize-scss/sass'],
                                data: `
                                 @import './src/scss/scss-assets/_variables.scss';
                                 @import './src/scss/scss-assets/_mixins.scss';
                                 @import './src/scss/scss-assets/_functions.scss';
                                 @import './src/scss/scss-assets/_config.scss';
                                 `
                            }
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
                filename: 'common.[contenthash].css',
                disable: false,
                allChunks: true
            }),
            new WebpackMd5Hash()
        ]
    };

    return config;
};
