const webpack = require("webpack");
const config = require("./webpack.config.base");
 
module.exports = {
    ...config,
    entry: config.entry.concat(["webpack-hot-middleware/client"]),
    plugins: config.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
    mode: "development",
    devServer: {
        contentBase: "src",
        hot: true,
        open: true
    },
    devtool: "source-map"
};
