import React, {Suspense} from "react";
import store from "./store";
import {Provider} from "react-redux";

const Content = React.lazy(() => import("./components/content/Content"));
const Heading = React.lazy(() => import("./components/heading/Heading"));

const App = () => {
    return (
        <Provider store={store}>
            <React.Fragment>
                <Suspense fallback={<div>loading...</div>}>
                    <Heading/>
                    <Content/>
                </Suspense>
            </React.Fragment>
        </Provider>
    );
};

export default App;
