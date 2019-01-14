import {combineReducers} from "redux";
import * as actionsModule from "./actions";

function localDependenciesReducer(state = [], action) {
    switch (action.type) {
        case actionsModule.UPDATE_LOCAL_DEPENDENCIES:
            return action.payload.slice();
        default:
            return state;
    }
}

function nuiDirectoryPathReducer (state = "", action) {
    if (action.type === actionsModule.UPDATE_NUI_DIRECTORY_PATH) {
        return action.payload;
    }

    return state;
}

function platformDirectoryPathReducer (state = "", action) {
    if (action.type === actionsModule.UPDATE_PLATFORM_DIRECTORY_PATH) {
        return action.payload;
    }

    return state;
}

function stdOutReducer(state = [], action) {
    if (action.type === actionsModule.UPDATE_STDOUT_HISTORY) {
        if (state.length >= 100) {
            return state.slice(1).concat([action.payload]);
        } 
        return state.concat([action.payload]);
    }

    return state;
}

function dependencyRootCopyReducer(state = false, action) {
    if (action.type === actionsModule.SET_DEPENDENCY_ROOT_COPY) {
        return action.payload;
    }

    return state;
}

const rootReducer = combineReducers({
    shouldCopyDependenciesToRoot: dependencyRootCopyReducer,
    localDependencies: localDependenciesReducer,
    nuiDirectoryPath: nuiDirectoryPathReducer,
    platformDirectoryPath: platformDirectoryPathReducer,
    stdOut: stdOutReducer
});

export default rootReducer;
