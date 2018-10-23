import React from "react";
import {connect} from "react-redux";
import ListItem from "./ListItem";

const List = ({localDependencies, platformDirectoryPath, className}) => {
    return (
        <div className={className}>
            {localDependencies.map((dependencyPath) => (
                <ListItem
                    key={dependencyPath}
                    dependencyPath={dependencyPath}
                    platformDirectoryPath={platformDirectoryPath}
                />
            ))}
        </div>
    );
};

function mapStateToProps({localDependencies, platformDirectoryPath}) {
    return {
        localDependencies,
        platformDirectoryPath
    };
}

export default connect(mapStateToProps)(List);
