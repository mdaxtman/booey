const path = require("path");
const fs = require("fs");
const {exec} = require("child_process");
const {defer, invoke} = require("lodash");

const MOBILE_DEBUG = "/experiences/control-mobile-debug/node_modules/@nui";
const DESKTOP_DEBUG = "/experiences/control-desktop-debug/node_modules/@nui";

let platformServer;
function buildAndCopyDependency(src, dest, send) {
    invoke(platformServer, "kill");

    return build(src, send)
        .then(findAllInstances.bind(null, src, dest, send))
        .then((destinationDirectories) => (
            copy(src, destinationDirectories, send)
        ))
        .then(buildPlatform.bind(null, dest, send))
        .then(startPlatfrom.bind(null, dest, send));
}

function build(src, send) {
    return new Promise((resolve, reject) => {

        const build = exec("rm -rf .nui && nui build", { cwd: src });

        build.stdout.on("data", (data) => {
            send(data);
        });
        
        build.on("close", () => {            
            resolve();
        });
        
        build.on("error", (err) => {
            reject(err);
        });
    });
}

function findAllInstances(src, dest, send) {
    return new Promise((resolve) => {
        const dependencyName = path.basename(src);
        send(`finding all instances of ${dependencyName} in platform`);

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
    })

}

function copy(src, destinationDirectories, send) {
    return new Promise((resolve) => {
        const transformsParent = fs.readdirSync(path.join(src, "/.nui"))[0];
        const fullMobileSrc = path.join(src, "/.nui", transformsParent, "/transforms/mobile-es6-debug");
        const fullDesktopSrc = path.join(src, "/.nui", transformsParent, "/transforms/desktop-es6-debug");

        destinationDirectories.forEach((destination) => {
            let src;

            if (destination.includes("mobile")) {
                src = fullMobileSrc;
            } else {
                src = fullDesktopSrc
            }

            send(`copying ${src} to ${destination}`);

            exec(`rsync --archive --progress --quiet --exclude=node_modules ${src}/* ${destination}`);
        });

        resolve();
    });
}

function buildPlatform(dest, send) {
    return new Promise((resolve, reject) => {
        invoke(platformServer, "kill");

        defer(() => {
            const build = exec("npm run build", { cwd: dest });

            build.stdout.on("data", (data) => {
                send(data);
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

function startPlatfrom(dest, send) {
    return new Promise((resolve, reject) => {
        send("starting server...");

        platformServer = exec("node dist --environment=development", {cwd: dest});

        platformServer.stdout.on("data", () => {
            resolve();
        });
        
        platformServer.stderr.on("data", (err) => {
            reject(err);
        });
    });
}

// ensures that if platform server is running when express exits, to kill it.
process.on("SIGINT", () => {
    invoke(platformServer, "kill");

    process.exit(0);
});

module.exports = buildAndCopyDependency;
