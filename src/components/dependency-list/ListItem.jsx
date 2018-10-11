import React from "react";
import styles from "./dependency-list.css";

class ListItem extends React.PureComponent {
    handleBuild = () => {

    }

    render() {
        return (
            <div className={styles.listItem}>
                <input type="checkbox"/>
                {this.props.dependencyPath}
                <button onClick={this.handleBuild}>build & copy</button>
            </div>
        );
    }
} 

export default ListItem
