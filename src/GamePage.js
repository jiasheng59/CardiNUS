import React from "react";
import Player from "./Player";

class GamePage extends React.Component {

    render() {
        const players = ["ori", "or", "andi", "and", "beq", "bnq", "j"];
        let count = 0;
        return (
            <ul>{
                players.map(player => {
                    count++;
                    return (<Player name={player} number={count} />);
                })
            }</ul>
        );
    }
}

export default GamePage;