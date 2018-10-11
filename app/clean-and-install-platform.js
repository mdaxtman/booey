const {spawn, execFile} = require("child_process");
const path = require("path");

function cleanAndInstallPlatform(platformPath) {
    const chmod = spawn(
        // "ls",
        // "pwd",
        "chmod +x ./clean-install.sh",
        {cwd: path.join(__dirname, "executables")}
    );

    chmod.stdout.on("data", (data) => {
        console.log("" + data);
    });

    // execFile(path.resolve(__dirname,"./executables/cleanInstallPlatform.sh"), {cwd: platformPath}, (error, stdout, stderr) => {
    //     console.log(error);
    //     console.log(stdout);
    //     console.log(stderr);
    // });
}

module.exports = cleanAndInstallPlatform;

cleanAndInstallPlatform("/Users/bi1w/repos/nui/platform");
