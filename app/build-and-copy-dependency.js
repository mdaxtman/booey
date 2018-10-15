const path = require("path");
const fs = require("fs");
const {exec} = require("child_process");
const {defer, invoke} = require("lodash");

const MOBILE_DEBUG = "/experiences/control-mobile-debug/node_modules/@nui";
const DESKTOP_DEBUG = "/experiences/control-desktop-debug/node_modules/@nui";

let platformServer;
function buildAndCopyDependency(src, dest, cb) {
    invoke(platformServer, "kill");

    build(src)
        .then(findAllInstances.bind(null, src, dest))
        .then(copy.bind(null, src))
        .then(buildPlatform.bind(null, dest))
        .then(startPlatfrom.bind(null, dest))
        .then(cb)
        .catch((err) => {
            cb(err);
        });
}

function build(src) {
    return new Promise((resolve, reject) => {

        const build = exec("rm -rf .nui && nui build", { cwd: src });

        build.stdout.on("data", (data) => {
            console.log(data);
        });
        
        build.on("close", () => {            
            resolve();
        });
        
        build.stderr.on("data", (err) => {
            reject(err);
        });
    });
}

function findAllInstances(src, dest) {
    return new Promise((resolve) => {
        const dependencyName = path.basename(src);
        console.log(`finding all instances of ${dependencyName} in platform`);

        const fullMobileDest = path.join(dest, MOBILE_DEBUG);
        const fullDesktopDest = path.join(dest, DESKTOP_DEBUG);
        const destinationDirectories = [];

        function recurse(dir) {
            let directories;

            try {
                directories = fs.readdirSync(dir);
            } catch(e) {
                return;
            }
    
            directories.forEach((dirName) => {
                if (dirName === dependencyName) {
                    destinationDirectories.push(path.join(dir, dependencyName));

                    return;
                }

                recurse(path.join(dir, dirName, "/node_modules/@nui"));
            });    
        }
    
        recurse(fullMobileDest);
        recurse(fullDesktopDest);

        resolve(destinationDirectories);
    });

}

function copy (src, destinations) {
    return new Promise((resolve) => {
        const transformsParent = fs.readdirSync(path.join(src, "/.nui"))[0];
        const fullMobileSrc = path.join(src, "/.nui", transformsParent, "/transforms/mobile-es6-debug");
        const fullDesktopSrc = path.join(src, "/.nui", transformsParent, "/transforms/desktop-es6-debug");

        destinations.forEach((destination) => {
            let src;

            if (destination.includes("mobile")) {
                src = fullMobileSrc;
            } else {
                src = fullDesktopSrc
            }

            console.log(`copying ${src} to ${destination}`);

            exec(`rsync --archive --progress --quiet --exclude=node_modules ${src}/* ${destination}`);
        });

        resolve();
    });
}

function buildPlatform(dest) {
    return new Promise((resolve, reject) => {
        invoke(platformServer, "kill");

        defer(() => {
            const build = exec("npm run build", { cwd: dest });

            build.stdout.on("data", (data) => {
                console.log(data);
            });
            build.on("close", () => {
                resolve();
            });

            build.stderr.on("data", (err) => {
                reject(err);
            });
        });
    });
}

function startPlatfrom(dest) {
    return new Promise((resolve, reject) => {
        console.log("starting server...");

        platformServer = exec("node dist --environment=development", {cwd: dest});
        
        platformServer.stdout.on("data", (data) => {
            console.log(data);
            resolve();
        });
        
        platformServer.stderr.on("data", (err) => {
            reject(err);
        });
    });
}

module.exports = buildAndCopyDependency;
