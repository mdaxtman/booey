export const UPDATE_LOCAL_DEPENDENCIES = "UPDATE_LOCAL_DEPENDENCIES";

export function updateLocalDependenciesAction(dependencies) {
    return {
        type: UPDATE_LOCAL_DEPENDENCIES,
        payload: dependencies
    }
}

export const UPDATE_NUI_DIRECTORY_PATH = "UPDATE_NUI_DIRECTORY_PATH";

export function updateNuiDirectoryPathAction(pathString) {
    return {
        type: UPDATE_NUI_DIRECTORY_PATH,
        payload: pathString
    }
}

export const UPDATE_PLATFORM_DIRECTORY_PATH = "UPDATE_PLATFORM_DIRECTORY_PATH";

export function updatePlatformDirectoryPathAction(pathString) {
    return {
        type: UPDATE_PLATFORM_DIRECTORY_PATH,
        payload: pathString
    }
}
