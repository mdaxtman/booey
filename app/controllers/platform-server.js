const {exec} = require("child_process");
const {get, invoke} = require("lodash");
const EventEmitter = require("events");

const serverEvents = new EventEmitter();

class PlatformServer {
    startServer(dest) {
        this.killServer();

        this.platformServer = exec("node dist --environment=development", { cwd: dest });

        this.platformServer.stdout.on("data", (data) => {
            if (data.toLowerCase().includes("error")) {
                serverEvents.emit("errMessage", data);
            }

            serverEvents.emit("on");
        });

        this.platformServer.stderr.on("data", (err) => {
            serverEvents.emit("off");
        });

        process.on("SIGINT", () => {
            this.killServer();
            process.exit(0);
        });
    }

    killServer() {
        if (!this.platformServer || this.platformServer.killed) {
            return;
        }

        invoke(this.platformServer, "kill");
        serverEvents.emit("off");
    }
}

module.exports = {
    platformServer: new PlatformServer(),
    serverEvents
};

// ensures that if platform server is running when express exits, to kill it.


