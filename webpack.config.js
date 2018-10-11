const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: [
        "./src/index.js",
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/'
    ],
    mode: "development",
    output: {
        filename: "main.js",
        path: path.join(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Booey - Better than NUI",
            template: "index.html",
            inject: "body"
        }),
        new CleanWebpackPlugin(["dist"]),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: "src",
        hot: true,
        open: true
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },
};
