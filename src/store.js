import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import {defer, omit} from "lodash";

const localStorageMiddleware = store => next => action => {
    console.log(action);

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

const store = createStore(rootReducer, omit(booeyStore, "stdOut"), applyMiddleware(localStorageMiddleware));

export default store;
