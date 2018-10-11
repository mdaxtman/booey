const path = require("path");

exports.isDependencyNuiAndLocal = (dependency, localPaths) => {
    const localSet = new Set(localPaths.map((localPath) => path.basename(localPath)));

    if (/(^@nui)/.test(dependency)) {
        const nameFromPath = dependency.split("@nui/")[1];

        if (localSet.has(nameFromPath)) {
            return true;
        }
    }

    return false;
};
