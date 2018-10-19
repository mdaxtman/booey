const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: [
        "./src/index.js",
    ],
    mode: "production",
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
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },
};
