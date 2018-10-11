import React from "react";
import Heading from "./components/heading/Heading"
import store from "./store";
import {Provider} from "react-redux";
import Content from "./components/content/Content";

const App = () => {
    return (
        <Provider store={store}>
            <React.Fragment>
                <Heading/>
                <Content/>
            </React.Fragment>
        </Provider>
    );
};

export default App;
