import React from "react";
import Player from "./Player";
import { Game } from "./Game";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../firebase/fire";

class GamePage extends React.Component { // this.props.phase
    constructor(props) {
        super(props);
        this.getPlayerList = this.getPlayerList.bind(this);
    }

    getPlayerList() {
        let playerList = [];
        const gameRef = ref(rtdb, '/games/' + this.props.roomId);
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            playerList = data.playersId;
        }, { onlyOnce: true });
        return playerList;
    }

    render() {
        const players = this.getPlayerList();
        let count = 0;
        return (
            <div>
                <Game roomId={this.props.roomId}></Game>
                <h2>Players in the room: </h2>
                <ul>
                    {players.map(player => {
                        count++;
                        return (<Player name={player} number={count} roomId={this.props.roomId} />);
                    })}
                </ul>
            </div>
        );
    }
}

export default GamePage;


// <NightEvent roomId={this.props.roomId}></NightEvent>
// <Description phase={"Choose attires"} roomId={this.props.roomId}></Description>

/*
    <Inspect></Inspect>                
    <VoteForCaptainEvent></VoteForCaptainEvent>
    <Timer secondsLeft={30}></Timer>
*/