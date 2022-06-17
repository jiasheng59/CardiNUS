import React from "react";
import ChooseAttiresEvent from "../Event/ChooseAttiresEvent";
import Timer from "./Timer";
/*
const phases = [
    "Choose attires",
    "Night",
    "Discussion",
    "Vote a Captain",
    "Captain time",
    "Vote for Alien",
    "Astronauts win",
    "Alien and Mr. D win"
]
*/
function Description(props) {
    if (props.phase === "Choose attires") {
        return (
            <ChooseAttiresEvent roomId={props.roomId}></ChooseAttiresEvent>
        );
    }
    if (props.phase === "Night") {
        return (
            <div>
                You may swap an attire with any other player.
            </div>
        );
    }
    if (props.phase === "Discussion") {
        return (
            <div>
                Discussion time left: <Timer secondsLeft={300}></Timer>
            </div>
        );
    }
    if (props.phase === "Vote for Alien") {
        return (
            <div>Vote the person you suspect might be an Alien. The person with highest vote will be eliminated.</div>
        );
    }
}

class GameBody extends React.Component {

    render() {
        return (
            <div>
                <Description phase={"Choose attires"}></Description>
            </div>
        );
    }
}

export { Description, GameBody };