import React from "react";
import Player from "./Player";
import { ChooseAttires, TestingShuffle } from "./Game";
import NightEvent from "./Event/NightEvent";
import VoteForCaptainEvent from "./Event/VoteEvent";
import Timer from "./Timer";
import Inspect from "./Captain";

class GamePage extends React.Component {
    render() {
        const players = ["ori", "or", "andi", "and", "beq", "bnq", "j"];
        let count = 0;
        return (
            <div>
                <h2>Players in the room: </h2>
                <ul>
                    {players.map(player => {
                        count++;
                        return (<Player name={player} number={count} />);
                    })}
                </ul>
                <TestingShuffle></TestingShuffle>
                <NightEvent></NightEvent>
                <Inspect></Inspect>
                <VoteForCaptainEvent></VoteForCaptainEvent>
                <Timer secondsLeft={30}></Timer>
            </div>
        );
    }
}

export default GamePage;