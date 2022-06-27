import React from "react";
import ChooseAttiresEvent from "../Event/ChooseAttiresEvent";
import NightEvent from "../Event/NightEvent";
import { VoteForAlienEvent, VoteForCaptainEvent } from "../Event/VoteEvent";
import Inspect from "./Captain";
import { getPlayerIndex, getAlienIndex, getMrDIndex } from "./Game";
import Timer from "./Timer";
import { auth } from "../firebase/fire";
import DayEvent from "../Event/DayEvent";

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
done, phase, mapIndex, roles, originalAttires, currentAttires, vote, captain
*/

function Description(props) {
    if (props.phase === "Choose Attires") {
        return (
            <ChooseAttiresEvent
                roomId={props.roomId}
                changePhase={props.changePhase}
            ></ChooseAttiresEvent>
        );
    }
    if (props.phase === "Night") {
        const messageForMrD =
            getPlayerIndex(props.roomId, auth.currentUser.uid) === getMrDIndex(props.roomId)
                ? <div>You are Mr.D</div>
                : <div></div>;
        return (
            <div>
                You may swap an attire with any other player.
                {messageForMrD}
                <NightEvent
                    roomId={props.roomId}
                    changePhase={props.changePhase}
                ></NightEvent>
            </div>
        );
    }
    if (props.phase === "Discussion") { // ViewMyAttires TBC
        return (
            <div>
                Discussion time left:
                <Timer
                    secondsLeft={100}
                    roomId={props.roomId}
                    changePhase={props.changePhase}
                ></Timer>
                <DayEvent roomId={props.roomId}></DayEvent>
            </div>
        );
    }
    if (props.phase === "Vote For Captain") {
        return (
            <div>
                Now, it's time to vote for a captain. The captain can view an attire from three players.
                <VoteForCaptainEvent
                    roomId={props.roomId}
                    changePhase={props.changePhase}
                ></VoteForCaptainEvent>
            </div>
        );
    }
    if (props.phase === "Captain Time") { // Inspect (in Captain.js) TBC
        if (props.captain === getPlayerIndex(props.roomId, auth.currentUser.uid)) {
            console.log(getPlayerIndex(props.roomId, auth.currentUser.uid))
            return (
                <div>
                    <div>
                        Congratulations! You are elected as captain in this round.
                        <br />
                        You can inspect three players' attires and decide whether to vote for Alien.
                    </div>
                    <Inspect
                        roomId={props.roomId}
                        changePhase={props.changePhase}
                    ></Inspect>
                </div>
            );
        } else {
            return (
                <div>
                    Please wait for the captain.
                </div>
            );
        }
    }
    if (props.phase === "Vote For Alien") {
        return (
            <div>
                <div>
                    Vote the person you suspect might be an Alien. The person with highest vote will be eliminated.
                </div>
                <VoteForAlienEvent
                    roomId={props.roomId}
                    changePhase={props.changePhase}
                ></VoteForAlienEvent>
            </div>
        );
    }
    if (props.phase === "Astronauts Win") {
        return (
            <div>
                <h4>Astronauts win!</h4>
                <div>{
                    `Alien is Player ${getAlienIndex(props.roomId) + 1},
                    Mr.D is Player ${getMrDIndex(props.roomId) + 1}`
                }</div>
            </div>
        );
    }
    if (props.phase === "Alien And Mr. D Win") {
        return (
            <div>
                <h4>Alien and Mr. D win!</h4>
                <div>{
                    `Alien is Player ${getAlienIndex(props.roomId) + 1},
                    Mr.D is Player ${getMrDIndex(props.roomId) + 1}`
                }</div>
            </div>
        );
    }
}

class GameBody extends React.Component {

    render() {
        return (
            <div>
                <Description phase={"Choose Attires"}></Description>
            </div>
        );
    }
}

export { Description, GameBody };