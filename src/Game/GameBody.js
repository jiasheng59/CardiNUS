import React from "react";
import ChooseAttiresEvent from "../Event/ChooseAttiresEvent";
import Timer from "./Timer";
/*
const phases = [
    "Choose Attires",
    "Night",
    "Discussion",
    "Vote For Captain",
    "Captain Time",
    "Vote For Alien",
    "Astronauts Win",
    "Alien And Mr. D Win"
]
*/

/*
Things to include while updating database
done, phase, mapIndex, roles, originalAttires, currentAttires
*/

function Description(props) {
    if (props.phase === "Choose Attires") {
        return (
            <ChooseAttiresEvent roomId={props.roomId} changePhase={props.changePhase}></ChooseAttiresEvent>
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