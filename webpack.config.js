const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: [
        "./src/index.js",
        "webpack-hot-middleware/client",
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
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
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
