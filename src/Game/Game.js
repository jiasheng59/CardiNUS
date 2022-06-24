import { onValue, ref, set } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../firebase/fire";
import { Description } from "./GameBody";

/*
const helmet = ['r', 'y', 'b', 't', 'p']; // red, yellow, blue, turquoise, purple
const visor = ['r', 'y', 'b', 't', 'p'];
const suit = ['r', 'y', 'b', 't', 'p'];
const gloves = ['r', 'y', 'b', 't', 'p'];
const boots = ['r', 'y', 'b', 't', 'p'];
*/

const ROLES = ["alien", "mrD", "astronaut", "astronaut", "astronaut", "astronaut", "astronaut"];
function getRandomInt(min, max) {
    // Both min and max are inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function shuffle(array) {
    for (let i = 1; i < array.length; i = i + 1) {
        const r = getRandomInt(0, i);
        const temp = array[i];
        array[i] = array[r];
        array[r] = temp;
    }
    return array;
}

function getHostId(roomId) {
    let hostId;
    const gameRef = ref(rtdb, '/games/' + roomId);
    onValue(gameRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            hostId = data.host;
        }
    }, { onlyOnce: true });
    return hostId;
}
function getPlayerIndex(roomId, uid) {
    let playerIndex;
    const playerIndexRef = ref(rtdb, '/games/' + roomId + '/gameInfo/mapIndex/' + uid);
    onValue(playerIndexRef, (snapshot) => {
        playerIndex = snapshot.val();
    });
    return playerIndex;
}
function getAlienIndex(roomId) {
    let alienIndex;
    const gameRef = ref(rtdb, '/games/' + roomId);
    onValue(gameRef, (snapshot) => {
        const roles = snapshot.val().roles;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "alien") {
                alienIndex = i;
            }
        }
    }, { onlyOnce: true });
    return alienIndex;
}
function getMrDIndex(roomId) {
        let mrDIndex;
        const gameRef = ref(rtdb, '/games/' + roomId);
        onValue(gameRef, (snapshot) => {
            const roles = snapshot.val().roles;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === "mrD") {
                    mrDIndex = i;
                }
            }
        }, { onlyOnce: true });
        return mrDIndex;
}

function isReadyToChangePhase(roomId) {
    let tempDone = 0;
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
    onValue(r, (snapshot) => {
        if (snapshot.exists) {
            const data = snapshot.val();
            tempDone = data.done;
        } else {
            console.log("fail");
        }
    });
    return tempDone === 7;
}


function doneAction(roomId) {
    // Update data.done. 
    // TODO: Nothing, but be very careful! Any additional field added to database 
    // is likely to trigger the need to modify this function.
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo/done');
    let data = 0;
    onValue(r, (snapshot) => {
        data = snapshot.val();
    });
    set(r, data + 1);
}

function setDoneToZero(roomId) {
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo/done');
    set(r, 0);
}


/*
Assign roles, set up player's index.
*/
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { phase: "Choose Attires", captain: -1}; 
        this.setPlayerIndex = this.setPlayerIndex.bind(this);
        this.assignRoles = this.assignRoles.bind(this);
        this.changePhase = this.changePhase.bind(this);
        this.listen = this.listen.bind(this);
        this.setCaptain = this.setCaptain.bind(this);
    }

    componentDidMount() { // When game begins, assgin roles.
        const { uid } = auth.currentUser;
        if (uid === getHostId(this.props.roomId)) {
            this.assignRoles();
        }
        this.setPlayerIndex();
        this.listen(); // listen for the phase change in database
    }

    setPlayerIndex() { // Start counting from 0
        const uid = auth.currentUser.uid;
        const gameRef = ref(rtdb, '/games/' + this.props.roomId);
        let playerIndex; // this player's index
        
        // Find this player's index
        onValue(gameRef, (snapshot) => {
            const players = snapshot.val().players;
            for (let i = 0; i < players.length; i++) {
                if (uid === players[i]) {
                    playerIndex = i;
                }
            }
        }, { onlyOnce: true });
        
        // Set this player's index
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        var tempIndex = {}
        onValue(r, (snapshot) => {
            const data = snapshot.val();
            tempIndex = data.mapIndex;
        }, {onlyOnce: true});
        tempIndex[uid] = playerIndex;
        set(ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/mapIndex'), tempIndex);
    }

    assignRoles() {
        var mapIndex = {};
        const uid = auth.currentUser.uid;
        mapIndex[uid] = 0;
        const roles = shuffle(ROLES);
        const gameInfoRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        set(gameInfoRef, {
            roles: roles,
            mapIndex: mapIndex,
            originalAttires: {},
            currentAttires: {},
            done: 0,
            phase: "Choose Attires",
            vote: [0, 0, 0, 0, 0, 0, 0],
            captain: -1
        });
    }

    changePhase(newPhase) {
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/phase');
        set(r, newPhase);
        alert(`Phase changed, now: ${newPhase}`);
    }

    listen() { // This function may cause trouble.
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/phase');
        onValue(r, (snapshot) => {
            if (snapshot.exists) {
                const curPhase = snapshot.val();
                this.setState({ phase: curPhase }); 
            } else {
                console.log("fail");
            }
        });
        const r2 = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/captain');
        onValue(r, (snapshot) => {
            if (snapshot.exists) {
                const captain = snapshot.val();
                this.setState({ captain: captain }); 
            } else {
                console.log("fail to synchronise captain");
            }
        });
    }

    setCaptain(playerIndex) {
        this.setState({ captain: playerIndex });
    }

    render() {
        return (
            <div>
                <Description
                    phase={this.state.phase}
                    roomId={this.props.roomId}
                    changePhase={this.changePhase}
                    captain={this.state.captain}
                >    
                </Description>
            </div>
        );
    }
}

///////////////////////////////////////////
/*
function setClientGameStarted(joinId) {
    const gameRef = ref(rtdb, '/games/' + joinId);
    onValue(gameRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            this.setState({
                gameStarted: (data.gameStarted)
            });
        }
    }, {onlyOnce: false});
}
*/
export { Game, getPlayerIndex, isReadyToChangePhase, doneAction, getAlienIndex, getMrDIndex };
    
    // <NightEvent roomId={this.props.roomId}></NightEvent>
// <Description phase={"Choose attires"} roomId={this.props.roomId}></Description>

/*
    <Inspect></Inspect>                
    <VoteForCaptainEvent></VoteForCaptainEvent>
    <Timer secondsLeft={30}></Timer>
*/

