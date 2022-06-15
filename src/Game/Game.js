import { onValue, ref, set } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../fire";
/*
const helmet = ['r', 'y', 'b', 't', 'p']; // red, yellow, blue, turquoise, purple
const visor = ['r', 'y', 'b', 't', 'p'];
const suit = ['r', 'y', 'b', 't', 'p'];
const gloves = ['r', 'y', 'b', 't', 'p'];
const boots = ['r', 'y', 'b', 't', 'p'];
*/

const roles = ["alien", "mrD", "astronaut", "astronaut", "astronaut", "astronaut", "astronaut"];
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameStarted: false };
        this.assignRoles = this.assignRoles.bind(this);
    }

    componentDidMount() { // When game begins, assgin roles.
        const { uid } = auth.currentUser;
        if (uid === getHostId(this.props.roomId)) {
            this.assignRoles();
        }
    }

    assignRoles() {
        // const shuffledRoles = some permutation
        // update database to assign role to each player
        const shuffledRoles = shuffle(roles);
        const rolesRef = ref(rtdb, '/games/' + this.props.roomId + '/roles');
        set(rolesRef, { shuffledRoles });
    }

    render() {
        return (
            <h1>Hellooo</h1>
        );
        /*
        if (!this.state.gameStarted) {

            // return <ChooseAttires />;
        } else {
            return <GamePlay />;
        }
        */
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
export default Game;

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

