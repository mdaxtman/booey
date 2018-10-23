const fs = require("fs");
const path = require("path"); 

function findNuiInDir(dir) {
    const results = [];
    let directoriesToSearch = 1;

    return new Promise((resolve) => {
        function recurse(directory = "") {
            const currentDirectory = path.join(dir, directory);
            
            fs.readdir(currentDirectory, (err, files) => {
                if (err) {
                    execCallbackOnComplete(--directoriesToSearch, resolve, results);
                    
                    return;
                }
                
                if (!!files.find((f) => f === ".nuirc.json" || f === ".nui" || f === ".nuirc")) {
                    console.log("found " + currentDirectory);
                    results.push(currentDirectory);
                    
                    execCallbackOnComplete(--directoriesToSearch, resolve, results);
                } else {
                    --directoriesToSearch;
                    console.log(currentDirectory + " is not a nui directory");
                    
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
    });

}

function execCallbackOnComplete(count, cb, results) {
    if (!count) {
        cb(results);
    }
}

module.exports = findNuiInDir;
