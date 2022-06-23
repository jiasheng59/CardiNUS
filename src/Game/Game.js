import { onValue, ref, set, update } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../fire";
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

function getHostId(roomId) { // roomId === joinId
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
    const playerIndexRef = ref(rtdb, '/games/' + roomId + '/gameInfo/playerIndex/' + uid);
    onValue(playerIndexRef, (snapshot) => {
        playerIndex = snapshot.val();
    });
    return playerIndex;
}

/*
Assign roles, set up player's index.
*/
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameStarted: false };
        this.setPlayerIndex = this.setPlayerIndex.bind(this);
        this.assignRoles = this.assignRoles.bind(this);
    }


    componentDidMount() { // When game begins, assgin roles.
        const { uid } = auth.currentUser;
        if (uid === getHostId(this.props.roomId)) {
            this.assignRoles();
        }
        this.setPlayerIndex();
    }
    

    setPlayerIndex() { // Start counting from 0
        const uid = auth.currentUser.uid;
        const gameRef = ref(rtdb, '/games/' + this.props.roomId);
        let yourIndex; // this player's index
        
        // Find this player's index
        onValue(gameRef, (snapshot) => {
            const players = snapshot.val().players;
            for (let i = 0; i < players.length; i++) {
                if (uid === players[i]) {
                    yourIndex = i;
                }
            }
        }, { onlyOnce: true });
        
        // Set this player's index
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        var tempIndex = {}
        var tempRole = []
        onValue(r, (snapshot) => {
            if(snapshot.exists) {
                const data = snapshot.val();
                data.mapIndex[uid] = playerIndex;
                tempIndex = data.mapIndex
                tempRole = data.roles
            } else {
                console.log("fail")
            } 
        }, {onlyOnce: true});
        const tempGameInfo = {
            roles : tempRole,
            mapIndex: tempIndex
        }
        set(r, tempGameInfo);
    }

    assignRoles() {
        // const shuffledRoles = some permutation
        // update database to assign role to each player
        var mapIndex = {};
        const uid = auth.currentUser.uid;
        mapIndex[uid] = 0;
        const roles = shuffle(ROLES);
        const gameInfoRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        set(gameInfoRef, { roles: roles, mapIndex: mapIndex });
    }

    render() {
        return (
            <div>
                <h1>Game is starting soon!</h1>
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
export { Game, getPlayerIndex };

/*
function TestingShuffle() {
    const roles = ["alien", "mrD", "astronaut", "astronaut", "astronaut", "astronaut", "astronaut"];
    const shuffledRoles = shuffle(roles).map(n => <li>{n}</li>);
    return (
        <ul>
            {shuffledRoles}
        </ul>
    );
}
*/

