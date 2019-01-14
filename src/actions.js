export const UPDATE_LOCAL_DEPENDENCIES = "UPDATE_LOCAL_DEPENDENCIES";

export function updateLocalDependenciesAction(dependencies) {
    return {
        type: UPDATE_LOCAL_DEPENDENCIES,
        payload: dependencies
    };
}

export const UPDATE_NUI_DIRECTORY_PATH = "UPDATE_NUI_DIRECTORY_PATH";

export function updateNuiDirectoryPathAction(pathString) {
    return {
        type: UPDATE_NUI_DIRECTORY_PATH,
        payload: pathString
    };
}

export const UPDATE_PLATFORM_DIRECTORY_PATH = "UPDATE_PLATFORM_DIRECTORY_PATH";

export function updatePlatformDirectoryPathAction(pathString) {
    return {
        type: UPDATE_PLATFORM_DIRECTORY_PATH,
        payload: pathString
    };
}

export const UPDATE_STDOUT_HISTORY = "UPDATE_STDOUT_HISTORY";

export function updateStdOutHistoryAction(str) {
    return {
        type: UPDATE_STDOUT_HISTORY,
        payload: str
    };
}

export const SET_DEPENDENCY_ROOT_COPY = "SET_DEPENDENCY_ROOT_COPY";

export function setDependencyRootCopy(value) {
    return {
        type: SET_DEPENDENCY_ROOT_COPY,
        payload: value
    }
}
