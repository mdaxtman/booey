const express = require("express");
const findNuiInDir = require("./find-nui-in-dir");
const {get, union, sort, sortedUniq} = require("lodash");
const buildAndCopyDependency = require("./build-and-copy-dependency");
const cleanAndInstallPlatform = require("./clean-and-install-platform");
const router = express.Router();

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
<<<<<<< HEAD
=======
            console.log(results);
>>>>>>> 48a7f6bf9d3463eaa5d41d53f3cf130a398e5b6e
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
