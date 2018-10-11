import React from "react";
import {connect} from "react-redux";
import ListItem from "./ListItem";

const List = ({localDependencies}) => {
    return (
        <div>
            {localDependencies.map((dependencyPath) => (
                <ListItem
                    key={dependencyPath}
                    dependencyPath={dependencyPath}
                />
            ))}
        </div>
    );
};

function mapStateToProps(state) {
    return {localDependencies: state.localDependencies};
}

export default connect(mapStateToProps)(List);
