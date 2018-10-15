const {exec} = require("child_process");
const path = require("path");

function cleanAndInstallPlatform(platformPath, cb) {
    cleanPlatfrom(platformPath)
        .then(installPlatform)
        .then(cb)
        .catch(err => cb(err));
}

function cleanPlatfrom(platformPath) {
    return new Promise((resolve, reject) => {
        const clean = exec("git checkout . && rm -rf node_modules", {cwd: platformPath});
        
        clean.stdout.on("close", () => {
            resolve(platformPath);
        });

        clean.stdout.on("err", () => {
            reject();
        });
    });
}

function installPlatform(platformPath) {
    return new Promise((resolve, reject) => {

        const install = exec("npm i && ./install", {cwd: platformPath});
        
        install.stdout.on("data", (data) => {
            console.log(data);
        });

        install.on("close", () => {
            resolve();
        });
        
        install.on("error", () => {
            reject();
        });
    });
}

module.exports = cleanAndInstallPlatform;
