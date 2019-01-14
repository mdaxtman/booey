const express = require("express");
const findNuiInDir = require("./find-nui-in-dir");
const {get, union, sortedUniq} = require("lodash");
const buildAndCopyDependency = require("./build-and-copy-dependency");
const cleanAndInstallPlatform = require("./clean-and-install-platform");
const {serverEvents, platformServer} = require("./controllers/platform-server");

const router = express.Router();
require('express-ws')(router);

router.get("/find-nui-dir/:directories", (req, res) => {

    if (!get(req, "params.directories")) {
        res.status(400).send("you need to provide a directory");

        return;
    }

    const directories = req.params.directories.replace(/;\s/g, ";").split(";");

    Promise.all(directories.map((d) => findNuiInDir(d)))
        .then((repos) => union(...repos))
        .then(sortedUniq)
        .then((results) => {
            res.send(JSON.stringify(results));
        })
        .catch((err) => {
            res.status(500).send(err);
        });

});

router.post("/clean-install-platform", (req, res) => {
    if (!get(req, "body.platformPath")) {
        res.status(400).send("you need to provide a directory");

        return;
    }

    cleanAndInstallPlatform(req.body.platformPath, (err) => {
        if (err) {
            res.status(500).send(err);
        }

        res.sendStatus(200);
    });
});

router.ws("/build-dependency", (ws) => {
    ws.on("message", (msg) => {
        let message;

        try {
            message = JSON.parse(msg);
        } catch (err) {
            return ws.close(1007);
        }

        if (!message || !message.dependencyPath || !message.platformPath) {
           return ws.close(1007);
        }
        
        buildAndCopyDependency(
            message.dependencyPath,
            message.platformPath,
            message.copyToRoot,
            ws.send.bind(ws)
        ).then(() => {
            ws.close(1000);
        }).catch((err) => {
            console.log(err);
            ws.send("internal error, exiting");
            ws.close(1011);
        });
    });
});

router.ws("/server-status", (ws) => {
    serverEvents.removeAllListeners("on");
    serverEvents.removeAllListeners("off");
    serverEvents.removeAllListeners("errMessage");

    serverEvents.on("on", () => {
        if (ws.readyState !== 1) {
            return;
        }

        ws.send("on");
    });

    serverEvents.on("off", () => {
        if (ws.readyState !== 1) {
            return;
        }

        ws.send("off");
    });

    serverEvents.on("errMessage", (err) => {
        ws.send(err);
    });

    ws.on("message", (msg) => {
        if (ws.readyState !== 1) {
            return;
        }

        const {type, payload} = JSON.parse(msg);

        if (type === "start" && payload) {
            platformServer.startServer(payload);
        }

        if (type === "stop") {
            platformServer.killServer();
        }
    });

    ws.on("close", () => {
        platformServer.killServer();
    });
});

module.exports = router;
