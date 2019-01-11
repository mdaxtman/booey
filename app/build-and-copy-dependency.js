const path = require("path");
const fs = require("fs");
const {exec} = require("child_process");
const {defer} = require("lodash");
const {platformServer} = require("./controllers/platform-server");

function platformPathTemplate(directory) {
    return `/experiences/${directory}/node_modules/@nui`
}

// Note: the indexes of these arrays are important. These items cannot be re-arranged
// unless you re-arange both
const SRC_DIRECTORIES = [
    "mobile-es6-debug",
    "desktop-es6-debug",
    "desktop-es5-debug",
    "mobile-es5-debug",
    "desktop-es6-production",
    "desktop-es5-production",
    "mobile-es6-production",
    "mobile-es5-production"
];
const PLATFORM_PATHS = [
    platformPathTemplate`control-mobile-debug`,
    platformPathTemplate`control-desktop-debug`,
    platformPathTemplate`control-desktop-debug-es5`,
    platformPathTemplate`control-mobile-debug-es5`,
    platformPathTemplate`control-desktop-production`,
    platformPathTemplate`control-desktop-production-es5`,
    platformPathTemplate`control-mobile-production`,
    platformPathTemplate`control-mobile-production-es5`
];

function buildAndCopyDependency(src, dest, copyToRoot = false, send) {
    return build(src, send)
        .then(findAllInstances.bind(null, src, dest, copyToRoot, send))
        .then((destinationDirectories) => (
            copy(src, destinationDirectories, send)
        ))
        .then(buildPlatform.bind(null, dest, send))
        .then(startPlatform.bind(null, dest, send))
        .catch((err) => {
            platformServer.killServer();
            throw err
        });
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
            console.log(err);
            reject(err);
        });
    });
}

function findAllInstances(src, dest, copyToRoot, send) {
    return new Promise((resolve) => {
        const dependencyName = path.basename(src);
        send(`finding all instances of ${dependencyName} in platform`);

        const destinationDirectories = copyToRoot ? PLATFORM_PATHS.map(exp => [path.join(dest, exp, dependencyName)]): [];

        function recurse(dir, i) {
            let directories;

            try {
                directories = fs.readdirSync(dir);
            } catch(e) {
                return;
            }

            directories.forEach((dirName) => {
                if (dirName === dependencyName) {
                    if (!destinationDirectories[i]) {
                        destinationDirectories[i] = [];
                    }

                    destinationDirectories[i].push(path.join(dir, dependencyName));

                    return;
                }

                recurse(path.join(dir, dirName, "/node_modules/@nui"), i);
            });    
        }
        
        PLATFORM_PATHS.forEach((platformPath, i) => {
            recurse(path.join(dest, platformPath), i);
        });

        resolve(destinationDirectories);
    })

}

function copy(src, destinationDirectories, send) {

    return new Promise((resolve) => {
        const transformsParent = fs.readdirSync(path.join(src, "/.nui"))[0];

        destinationDirectories.forEach((destinations, i) => {
            const sourceDirectory = path.join(src, "/.nui", transformsParent, "/transforms", SRC_DIRECTORIES[i]);

            destinations.forEach((destination) => {
                send(`copying ${sourceDirectory} to ${destination}\n\n`);                
                exec(`rsync --archive --progress --quiet --exclude=node_modules ${sourceDirectory}/* ${destination}`);
            });
        });

        resolve();
    });
}

function buildPlatform(dest, send) {
    return new Promise((resolve, reject) => {
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

function startPlatform(dest, send) {
    return new Promise((resolve) => {
        send("starting server...");

        platformServer.startServer(dest);
        resolve();
    });
}

module.exports = buildAndCopyDependency;
