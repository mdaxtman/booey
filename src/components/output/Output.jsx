import {connect} from "react-redux";
import {defer} from "lodash";
import Convert from "ansi-to-html";
import React from "react";
const convert = new Convert();

class Output extends React.PureComponent {
    constructor(props) {
        super(props);

        this.outputElement = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stdOut.length < this.props.stdOut.length) {
            defer(() => {
                const output = this.outputElement.current;
                output.scrollTop = output.scrollHeight - output.clientHeight;
            });
        }
    }


    static defaultProps = {
        stdOut: []
    }

    render() {
        const {stdOut, className} = this.props;

        return (
            <div
                className={className}
                ref={this.outputElement}
            >
                {stdOut.map((line, i) => (
                    <div
                        key={i}
                        // for some reason this ansi character is not being converted.
                        dangerouslySetInnerHTML={{ __html: convert.toHtml(line.replace(/(\?)?25l/g, "\n"))}}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({stdOut}) => {
    return {
        stdOut
    };
};

export default connect(mapStateToProps)(Output);
