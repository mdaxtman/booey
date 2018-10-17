import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import {defer} from "lodash";

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
console.log(booeyStore);

const store = createStore(rootReducer, booeyStore, applyMiddleware(localStorageMiddleware), );

export default store;
