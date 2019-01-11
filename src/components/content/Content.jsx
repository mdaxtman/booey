import {connect} from "react-redux";
import {setDependencyRootCopy} from "../../actions";
import classNames from "classnames";
import List from "../dependency-list/List";
import Output from "../output/Output";
import React from "react";
import styles from "./content.css";

class Content extends React.PureComponent {
    handleCheckboxChange = (event) => {
        this.props.dispatch(setDependencyRootCopy(!this.props.copyToRoot));
    }
    render() {
        return(
           <React.Fragment>
                <div className={styles.controlPanel}>
                   <button
                        disabled={true}
                    >
                        Build & Copy selected
                    </button>
                    <div>
                        <input
                            value="true"
                            name="root-copy"
                            type="checkbox"
                            checked={this.props.copyToRoot}
                            onChange={this.handleCheckboxChange}
                        />
                        <label htmlFor="root-copy">
                            Check to copy dependencies to the root @nui dir of each experience's node_modules.
                        </label>
                   </div>
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

const mapStateToProps = (state) => ({
    copyToRoot: state.shouldCopyDependenciesToRoot
});
export default connect(mapStateToProps)(Content);
