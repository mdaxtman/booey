const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers");

function findDependenciesForModule(absolutePath, localRepos, cb) {
    fs.readFile(path.resolve(absolutePath, "package.json"), (err, results) => {
        if (err) {
            return;
        }

        const dependencies = JSON.parse(results).dependencies;

        cb(
            _(dependencies)
                .keys()
                .filter((dependencyName) => isDependencyNuiAndLocal(dependencyName, localRepos))
                .value()
        );

    });
}

module.exports = findDependenciesForModule;
