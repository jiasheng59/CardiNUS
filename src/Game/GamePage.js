import React from "react";
import Player from "./Player";
import { Game } from "./Game";
import NightEvent from "../Event/NightEvent";
import VoteForCaptainEvent from "../Event/VoteEvent";
import Timer from "./Timer";
import Inspect from "./Captain";
import { Description } from "./GameBody";

class GamePage extends React.Component { // this.props.phase

    render() {
        const players = ["ori", "or", "andi", "and", "beq", "bnq", "j"];
        let count = 0;
        return (
            <div>
                <Game roomId={this.props.roomId}></Game>
                <Description phase={"Choose attires"} roomId={this.props.roomId}></Description>
                <h2>Players in the room: </h2>
                <ul>
                    {players.map(player => {
                        count++;
                        return (<Player name={player} number={count} />);
                    })}
                </ul>
                <Inspect></Inspect>
                <VoteForCaptainEvent></VoteForCaptainEvent>
                <Timer secondsLeft={30}></Timer>
                <NightEvent roomId={this.props.roomId}></NightEvent>
            </div>
        );
    }
}

export default GamePage;