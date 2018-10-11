const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const router = require("./app/router");
const config = require("./webpack.config.js");
const bodyParser = require("body-parser");
const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
    ...config.devServer
}));

app.use(webpackHotMiddleware(compiler));

app.use("/api", router);


const port = 3131;
app.listen(port, function () {
    console.log(`server listening on port ${port}\n`);
});
