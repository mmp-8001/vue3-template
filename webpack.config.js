const path = require('path');
const {DefinePlugin} = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const LANGUAGES = require("./lang.json")
require('dotenv').config();

const envDefaults = {
    MODE: 'production',
};

module.exports = Object.keys(LANGUAGES).map(function (language) {
    let rtl_ltr = `$is_rtl: ${LANGUAGES[language]['direction'] === "rtl" ? "true" : "false"};`
    return {
        mode: envDefaults.MODE === 'production' ? 'production' : 'development',
        devtool: false,
        entry: path.resolve(__dirname, './src/main.ts'),

        output: {
            filename: "[name]." + language + ".js",
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
                        {
                            loader: "sass-loader",
                            options: {
                                additionalData: rtl_ltr,
                            }
                        }
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
                    'DOMAIN': JSON.stringify(process.env.DOMAIN),
                    'LAN': JSON.stringify(LANGUAGES[language])
                },
                __VUE_OPTIONS_API__: JSON.stringify(true),
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
            }),
        ],

    };
});