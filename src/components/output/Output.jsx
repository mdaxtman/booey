import React from "react";
import {connect} from "react-redux";

class Output extends React.PureComponent {
    constructor(props) {
        super(props);

        this.outputElement = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stdOut.length < this.props.stdOut.length) {
            const output = this.outputElement.current;
            output.scrollTop = output.scrollHeight - output.clientHeight;
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
                    <div key={i}>
                        {line}
                    </div>
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
