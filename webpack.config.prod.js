const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = require("./webpack.config.base");

config.plugins = config.plugins.concat([new CleanWebpackPlugin(["dist"])]);

module.exports = {
    ...config,
    mode: "production",
};
