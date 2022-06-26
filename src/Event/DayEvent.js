import React from "react";
import ViewMyAttires from "../Game/ViewMyAttires";

class DayEvent extends React.Component {
    constructor(props) {
        super(props);
    }
        
    render() {
        return (
            <div>
                <ViewMyAttires roomId={this.props.roomId}></ViewMyAttires>
            </div>
        );
    }
}

export default DayEvent;