const express = require("express");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

const server = new webpackDevServer(compiler, {
    ...config.devServer
});

const port = 8080;
server.listen(port, function () {
    console.log(`server listening on port ${port}\n`);
});
