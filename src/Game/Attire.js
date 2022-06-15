import React from "react";

class Attire extends React.Component {
    constructor(props) {
        super(props);
    }

    formatImageName(imageName) {
        // To do
    } 

    render(props) {
        const imageName = formatImageName(this.props.imageName);
        return (
            <img src={this.props.name} />
        );
    }
}

export default Attire;