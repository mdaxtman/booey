import React from "react";
import styles from "./heading.css";
import {connect} from "react-redux";
import {updateLocalDependenciesAction, updateNuiDirectoryPathAction, updatePlatformDirectoryPathAction} from "../../actions"
import ServerStatus from "./ServerStatus.jsx";


class Heading extends React.PureComponent {
    handleNuiDirectoryChange = ({target: {value}}) => {
        this.props.dispatch(updateNuiDirectoryPathAction(value));
    }

    handlePlatformDirectoryChange = ({ target: { value } }) => {
        this.props.dispatch(updatePlatformDirectoryPathAction(value));
    }

    handleFindRepos = () => {
        this.props.dispatch(updateLocalDependenciesAction([]));

        window.fetch("/api/find-nui-dir/" + window.encodeURIComponent(this.props.nuiDirectoryPath))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.props.dispatch(updateLocalDependenciesAction(data));                
            });
    }

    handleCleanInstall = () => {
        window.fetch(
            "/api/clean-install-platform",
            {
                method: "POST",
                body: JSON.stringify({platformPath: this.props.platformDirectoryPath}),
                headers: {
                    "content-type": "application/json"
                }
            });
    }

    render() {
        return (
            <div className={styles.heading}>
                <div>
                    <div>nui repos directory</div>
                    <input
                        type="text"
                        name="nui-dir"
                        onChange={this.handleNuiDirectoryChange}
                        value={this.props.nuiDirectoryPath}
                    />
                    <button onClick={this.handleFindRepos}>
                        {this.props.haslocalDependencies ? "refresh repos" : "find repos"}
                    </button>
                </div>
                <div>
                    <div>platform directory</div>
                    <input
                        type="text"
                        name="platform-dir"
                        onChange={this.handlePlatformDirectoryChange}
                        value={this.props.platformDirectoryPath}
                    />
                    <button
                        onClick={this.handleCleanInstall}
                    >
                        clean/install
                    </button>
                    <button disabled>
                        build/start
                    </button>
                    <ServerStatus />
                </div>
            </div>
        );
    } 
};

function mapStateToProps({localDependencies, nuiDirectoryPath, platformDirectoryPath}) {
    return {
        nuiDirectoryPath,
        platformDirectoryPath,
        haslocalDependencies: !!(localDependencies || []).length
    };
}
export default connect(mapStateToProps)(Heading);
