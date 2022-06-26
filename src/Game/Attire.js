import React from "react";

class Attire extends React.Component {

    render() {
        return (
            <div>{`${this.props.attire}: ${this.props.color}`}</div>
        );
    }
}

export default Attire;