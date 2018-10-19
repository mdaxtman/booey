const express = require("express");
const router = require("./app/router");
const bodyParser = require("body-parser");
const app = express();
const {exec} = require("child_process");

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const config = require("./webpack.config.dev.js");
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        ...config.devServer
    }));
    app.use(webpackHotMiddleware(compiler));

} else {
    app.use(express.static("dist"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

const port = 3131;
app.listen(port, function () {
    if (!isDevelopment) {
        exec("open http://localhost:3131");
    }

    console.log(`server listening on port ${port}\n`);
});
