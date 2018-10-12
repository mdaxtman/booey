import React from "react";
import styles from "./dependency-list.css";

class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pending: false
        };
    }
    handleBuild = () => {
        this.setState({pending: true});

        window.fetch(
            "/api/build-dependency",
            {
                method: "POST",
                body: JSON.stringify({
                    dependencyPath: this.props.dependencyPath,
                    platformPath: this.props.platformDirectoryPath
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(() => {
                this.setState({pending: false});
            })
            .catch(() => {
                this.setState({pending: false});
            });
            // .then(body => body.getReader())
            // .then((reader) => {
            //     return new ReadableStream({
            //         start(controller) {
            //             function recursiveStream() {
            //                 return reader.read().then((data) => {
            //                     if (data.done) {
            //                         controller.close();

            //                         return;
            //                     }

            //                     console.log(new Response(data.value).text());

            //                     return recursiveStream();
            //                 })
            //             }

            //             return recursiveStream();
            //         }
            //     })
            // });
    }

    render() {
        return (
            <div className={styles.listItem}>
                <input type="checkbox"/>
                {this.props.dependencyPath}
                <button
                    onClick={this.handleBuild}
                    disabled={this.state.pending}
                >
                    {this.state.pending ? "pending" : "build & copy"}
                </button>
                
            </div>
        );
    }
} 

export default ListItem
