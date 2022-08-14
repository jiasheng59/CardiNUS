import React from "react";
import ChooseAttiresEvent from "../Event/ChooseAttiresEvent";
import NightEvent from "../Event/NightEvent";
import { VoteForAlienEvent, VoteForCaptainEvent } from "../Event/VoteEvent";
import Inspect from "./Captain";
import { getPlayerIndex, getAlienIndex, getMrDIndex } from "./Game";
import Timer from "./Timer";
import { auth, rtdb } from "../firebase/fire";
import DayEvent from "../Event/DayEvent";
import { onValue, set, ref } from "firebase/database";

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

function afterAstronautsWin(roomId) {
    const r = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics');
    const rTotal = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics/TotalGames');
    const rCrew = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics/WinAsCrew');
    let total = 0;
    let alien = 0;
    let crew = 0;
    onValue(r, snapshot => {
        const stats = snapshot.val();
        total = stats.TotalGames;
        alien = stats.WinAsAlien;
        crew = stats.WinAsCrew;
    }, { onlyOnce: true });
    set(rTotal, total + 1);
    if (getPlayerIndex(roomId, auth.currentUser.uid) === getAlienIndex(roomId) ||
        getPlayerIndex(roomId, auth.currentUser.uid) === getMrDIndex(roomId)) {
        return;
    } else {
        set(rCrew, crew + 1);
    }
}

function afterAlienWin(roomId) {
    const r = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics');
    const rTotal = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics/TotalGames');
    const rAlien = ref(rtdb, '/profiles/' + auth.currentUser.uid + '/statistics/WinAsAlien');
    let total = 0;
    let alien = 0;
    let crew = 0;
    onValue(r, snapshot => {
        const stats = snapshot.val();
        total = stats.TotalGames;
        alien = stats.WinAsAlien;
        crew = stats.WinAsCrew;
    }, { onlyOnce: true });
    set(rTotal, total + 1);
    if (getPlayerIndex(roomId, auth.currentUser.uid) === getAlienIndex(roomId) ||
        getPlayerIndex(roomId, auth.currentUser.uid) === getMrDIndex(roomId)) {
        set(rAlien, alien + 1);
    }
}

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
        const alienIndex = getAlienIndex(props.roomId);
        const messageForMrD =
            getPlayerIndex(props.roomId, auth.currentUser.uid) === getMrDIndex(props.roomId)
                ? <div>{`You are Mr.D. Alien is player ${alienIndex + 1}`}</div>
                : <div></div>;
        return (
            <div className="description">
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
            <div className="description">
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
            <div className="description">
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
            return (
                <div>
                    <div className="description">
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
                <div className="description">
                    Please wait for the captain.
                </div>
            );
        }
    }
    if (props.phase === "Vote For Alien") {
        return (
            <div>
                <div className="description">
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
        afterAstronautsWin(props.roomId);
        return (
            <div className="description">
                <h4>Astronauts win!</h4>
                <div>{
                    `Alien is Player ${getAlienIndex(props.roomId) + 1},
                    Mr.D is Player ${getMrDIndex(props.roomId) + 1}`
                }</div>
            </div>
        );
    }
    if (props.phase === "Alien And Mr. D Win") {
        afterAlienWin(props.roomId);
        return (
            <div className="description">
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