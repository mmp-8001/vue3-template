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
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
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
            'process.env': {
                NODE_ENV: JSON.stringify(env.prod === 'production' ? 'production' : 'development'),
            },

            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(env.prod !== 'production'),
        }),
    ],

    devServer: {
        contentBase: __dirname,
        hot: true,
        inline: true,
        overlay: true,
        stats: 'minimal',
    },
});
