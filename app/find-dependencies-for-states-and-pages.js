const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers.js");

function findDependenciesForStatesAndPages(map, localPaths, cb) {
    const mapOfDependencies = {};
    const localPathsSet = new Set(localPaths.map(localPath => path.basename(localPath)));
    let count = Object.keys(map).length;

    _.forEach(map, (absPath, dependencyName) => {
        fs.readFile(path.resolve(absPath, "package.json"), (err, contents) => {
            --count;

            if (err) {
                return;
            }

            mapOfDependencies[dependencyName] = 
                _(JSON.parse(contents).dependencies)
                    .omitBy((version, dependency) => !isDependencyNuiAndLocal(dependency, localPaths))
                    .keys()
                    .value();
            
            if (!count) {
                cb(mapOfDependencies);
            }
        });
    });
}

module.exports = findDependenciesForStatesAndPages;
