const fs = require("fs");
const path = require("path"); 

const DIR = "/Users/bi1w/repos/nui";

function findNuiInDir(dir, cb) {
    const results = [];
    let directoriesToSearch = 1;

    function recurse(directory = "") {
        const currentDirectory = path.join(dir, directory);

        fs.readdir(currentDirectory, (err, files) => {
            if (err) {
                execCallbackOnComplete(--directoriesToSearch, cb, results);

                return;
            }

            if (!!files.find((f) => f === ".nuirc.json" || f === ".nui" || f === ".nuirc")) {
                results.push(currentDirectory);

                execCallbackOnComplete(--directoriesToSearch, cb, results);
            } else {
                --directoriesToSearch;

                if (!!files.find(f => f === "node_modules" || f === "package.json")) {
                    return;
                }

                files.forEach((fileOrDirectory) => {
                    if (fileOrDirectory === "platform" || path.extname(fileOrDirectory)) {
                        return;
                    }

                    ++directoriesToSearch;
                    recurse(path.join(directory, fileOrDirectory));
                });
            }
        });
    }

    recurse();
}

function execCallbackOnComplete(count, cb, results) {
    if (!count) {
        cb(results.sort());
    }
}

module.exports = findNuiInDir;

findNuiInDir(DIR, (results) => console.log(results));
