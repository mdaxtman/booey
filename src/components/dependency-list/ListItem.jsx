import React from "react";
import styles from "./dependency-list.css";
import classNames from "classnames";
import {connect} from "react-redux";
import {updateStdOutHistory} from "../../actions";
import WS from "../../controllers/websockets";

class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pending: false
        };
    }
    handleBuild = () => {
        this.setState({pending: true});
        
        const ws = new WS("/api/build-dependency", {
            onopen:() => ws.send({
                dependencyPath: this.props.dependencyPath,
                platformPath: this.props.platformDirectoryPath
            }),
            onmessage:({data}) => {
                this.props.dispatch(updateStdOutHistory(data));
            },
            onclose: () => {
                this.setState({ pending: false })
            }
        });
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
