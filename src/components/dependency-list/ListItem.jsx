import React from "react";
import styles from "./dependency-list.css";
import classNames from "classnames";
import {connect} from "react-redux";
import {updateStdOutHistory} from "../../actions";
class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pending: false
        };
    }
    handleBuild = () => {
        this.setState({pending: true});

        const ws = new WebSocket(
            `ws://${window.location.host}/api/build-dependency`
        );

        ws.onopen = () => ws.send(
            JSON.stringify({
                dependencyPath: this.props.dependencyPath,
                platformPath: this.props.platformDirectoryPath
            })
        );

        ws.onmessage = ({data}) => {
            this.props.dispatch(updateStdOutHistory(data));
        };

        ws.onclose = () => {
            this.setState({pending: false})
        };

        // window.fetch(
        //     "/api/build-dependency",
        //     {
        //         method: "POST",
        //         body: JSON.stringify({
        //             dependencyPath: this.props.dependencyPath,
        //             platformPath: this.props.platformDirectoryPath
        //         }),
        //         headers: {
        //             "content-type": "application/json"
        //         }
        //     })
        //     .then(() => {
        //         this.setState({pending: false});
        //     })
        //     .catch(() => {
        //         this.setState({pending: false});
        //     });
    }

    render() {
        return (
            <div className={styles.listItem}>
                <input type="checkbox"/>
                {this.props.dependencyPath}
                <button
                    onClick={this.handleBuild}
                    disabled={this.state.pending}
                    className={classNames({[styles.button]: this.state.pending})}
                >
                    {this.state.pending ? "pending" : "build & copy -> build & start"}
                </button>
                
            </div>
        );
    }
} 

export default connect()(ListItem);
