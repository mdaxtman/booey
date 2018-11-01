import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import {defer, omit} from "lodash";
import thunk from "redux-thunk";

const localStorageMiddleware = store => next => action => {
    defer(() => {
        localStorage.setItem("booeyStore", JSON.stringify(store.getState()));
    });

    next(action);
}

let booeyStore;

try {
    booeyStore = JSON.parse(localStorage.getItem("booeyStore"));
} catch(e) {
    
}
if (!booeyStore) {
    booeyStore = rootReducer(undefined, {});
}

const store = createStore(rootReducer, omit(booeyStore, "stdOut"), applyMiddleware(thunk, localStorageMiddleware));

export default store;
