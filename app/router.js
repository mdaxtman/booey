const express = require("express");
const findNuiInDir = require("./find-nui-in-dir");
const {get} = require("lodash");
const buildAndCopyDependency = require("./build-and-copy-dependency");
const cleanAndInstallPlatform = require("./clean-and-install-platform");
const router = express.Router();

router.get("/find-nui-dir/:directory", (req, res) => {

    if (!get(req, "params.directory")) {
        res.status(400).send("you need to provide a directory");

        return;
    }

    findNuiInDir(req.params.directory, (results) => {
        res.send(JSON.stringify(results));
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

router.post("/build-dependency", (req, res) => {
    if (!(get(req, "body.platformPath") || !get(req, "body.dependencyPath"))) {
        res.status(400).send("you must provide both dependency and platform directories");
        
        return;
    }

    buildAndCopyDependency(req.body.dependencyPath, req.body.platformPath, (err) => {
        if (err) {
            res.status(500).send(err);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
