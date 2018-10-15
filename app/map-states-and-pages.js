const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers.js");

const platformDirectory = "/Users/bi1w/repos/nui/platform";

function mapStatesAndPages(localAbsolutePaths, cb) {

    fs.readFile(path.resolve(platformDirectory, ".platformrc.json"), (err, file) => {
        if (err) {
            return;
        }

        const results = {};
        const platformExperiences = JSON.parse(file).experiences;
        _({
            ...platformExperiences[0].components,
            ...platformExperiences[0].state,
            ...platformExperiences[1].components,
            ...platformExperiences[1].state
        })
            .keys()
            .uniq()
            .forEach((dependency) => {
                if (isDependencyNuiAndLocal(dependency, localAbsolutePaths)) {
                    results[dependency] = localAbsolutePaths.find(relativePath => relativePath.includes(dependency.split("@nui")[1]));
                }
            });
        
        cb(results);
    });
}

module.exports = mapStatesAndPages;
