require('dotenv').config();
const express = require("express");
const router = require("./app/router");
const bodyParser = require("body-parser");
const app = express();

// TODO: set up a dev mode, and a compiled mode.
// if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const config = require("./webpack.config.js");
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        ...config.devServer
    }));
    app.use(webpackHotMiddleware(compiler));
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", router);




const port = 3131;
app.listen(port, function () {
    console.log(`server listening on port ${port}\n`);
});
