import React from "react";

class Win extends React.Component {
    constructor(props) {
        super(props);
    }
        
    render() {
        if (this.props.winner === "Alien") {
            return (
                <div>
                    
                </div>
            );

        } else { // (this.props.winner === "Astronauts") 
            return (
                <div>
                
                </div>
            );
            
        }
    }
}

export default Win;