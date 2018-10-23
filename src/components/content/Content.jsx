import React from "react";
import List from "../dependency-list/List";
import styles from "./content.css";
import Output from "../output/Output";
import classNames from "classnames";

class Content extends React.PureComponent {
    render() {
       return(
           <React.Fragment>
                <div className={styles.controlPanel}>
                   <button disabled={true}>Build & Copy selected</button>
                </div>
                <div className={styles.main}>
                    <List className={styles.flexItem}/>
                    <Output
                        className={
                            classNames(
                                styles.flexItem,
                                styles.output
                        )}
                    />
                </div>
           </React.Fragment>
       );
    }
}

export default Content;
