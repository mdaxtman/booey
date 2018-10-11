import React from "react";
import List from "../dependency-list/List";
import styles from "./content.css";

class Content extends React.PureComponent {
    render() {
       return(
           <React.Fragment>
                <div className={styles.controlPanel}>
                   <button disabled={true}>Build & Copy selected</button>
                </div>
                <List />
           </React.Fragment>
       );
    }
}

export default Content;
