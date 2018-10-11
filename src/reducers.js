import {combineReducers} from "redux";
import * as actions from "./actions";

function localDependenciesReducer(state = [], action) {
    switch (action.type) {
        case actions.UPDATE_LOCAL_DEPENDENCIES:
            return action.payload.slice();
        default:
            return state;
    }
}

function nuiDirectoryPathReducer (state = "", action) {
    if (action.type === actions.UPDATE_NUI_DIRECTORY_PATH) {
        return action.payload;
    }

    return state;
}

function platformDirectoryPathReducer (state = "", action) {
    if (action.type === actions.UPDATE_PLATFORM_DIRECTORY_PATH) {
        return action.payload;
    }

    return state;
}




const rootReducer = combineReducers({
    localDependencies: localDependenciesReducer,
    nuiDirectoryPath: nuiDirectoryPathReducer,
    platformDirectoryPath: platformDirectoryPathReducer
});

export default rootReducer;
