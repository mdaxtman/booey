import {connect} from "react-redux";
import classNames from "classnames";
import React, {Component} from "react";
import styles from "./server-status.css";
import WS from "../../controllers/websockets";
import {updateStdOutHistoryAction} from "../../actions";

class ServerStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverRunning: null
        };

        this.ws = new WS("/api/server-status", {
            onmessage: (msg) => {
                if (msg.data === "on") {
                    this.setState({serverRunning: true});
                }

                if (msg.data === "off") {
                    this.setState({serverRunning: false});
                }
            },
            onopen: () => {
                if (props.platformDirectoryPath) {
                    this.setState({serverRunning: false})
                }
            }
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.platformDirectoryPath && typeof state.serverRunning !== "boolean") {
            return {
                serverRunning: false
            };
        } else if (!props.platformDirectoryPath) {
            return {
                serverRunning: null
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        let msg = "";

        if (prevState.serverRunning && !this.state.serverRunning) {
            msg = "platform server stopped";
        } else if (!prevState.serverRunning && this.state.serverRunning) {
            msg = "platform server started";
        }

        if (msg) {
            this.props.dispatch(updateStdOutHistoryAction(msg));
        }
    }

    handleStart = () => {
        this.props.dispatch(updateStdOutHistoryAction("starting server..."));
        this.ws.send({
            type: "start",
            payload: this.props.platformDirectoryPath
        });
    }

    handleStop = () => {
        this.ws.send({
            type: "stop"
        });
    }

    render() {
        if (typeof this.state.serverRunning !== "boolean") {
            return null;
        }

        return (
            <div>
                Platform Server Status:
                <div>
                    <span
                        className={classNames(
                            styles.serverStatus,
                            {[styles.serverOn]: this.state.serverRunning},
                            {[styles.serverOff]: !this.state.serverRunning}
                        )}
                    >
                    </span>
                    <button
                        onClick={this.handleStart}
                    >
                        {this.state.serverRunning ? "restart" : "start"}
                    </button>
                    {this.state.serverRunning && (
                            <button
                                onClick={this.handleStop}
                            >
                                stop
                            </button>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(({platformDirectoryPath}) => ({platformDirectoryPath}))(ServerStatus);
