const express = require("express");
const findNuiInDir = require("./find-nui-in-dir");
const {get} = require("lodash");

const router = express.Router();

router.get("/find-nui-dir/:directory", (req, res) => {

    if (!get(req, "params.directory")) {
        res.send("you need to provide a directory", 400);

        return;
    }

    findNuiInDir(req.params.directory, (results) => {
        res.send(JSON.stringify(results));
    });

});

router.post("/clean-install-platform", (req, res) => {
    if (!get(req, "body.platformPath")) {
        res.send("you need to provide a directory", 400);
    }



    res.send("he")
});
module.exports = router;
