const path = require('path');
const {DefinePlugin} = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
require('dotenv').config();

const envDefaults = {
    MODE: 'production',
};

module.exports = (env = envDefaults) => ({
    mode: env.MODE === 'production' ? 'production' : 'development',
    devtool: false,
    entry: path.resolve(__dirname, './src/main.ts'),

    output: {
        path: path.resolve(__dirname, './static'),
        publicPath: '/static/',
    },

    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue': '@vue/runtime-dom',
        },
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,

                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',

                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

        new DefinePlugin({
            'process.env':{
                'DOMAIN': JSON.stringify(process.env.DOMAIN)
            },
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        }),
    ],
});
