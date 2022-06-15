import { onValue, ref, set } from "firebase/database";
import React, { useState } from "react";
import ReactModal from 'react-modal';
import { rtdb, auth } from "./fire";

const helmet = ['r', 'y', 'b', 't', 'p']; // red, yellow, blue, turquoise, purple
const visor = ['r', 'y', 'b', 't', 'p'];
const suit = ['r', 'y', 'b', 't', 'p'];
const gloves = ['r', 'y', 'b', 't', 'p'];
const boots = ['r', 'y', 'b', 't', 'p'];

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

class ChooseAttires extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, attire) {
        // update attire of the player in database
    }

    handleSubmit(event) {
        // update database state, check if every player done choosing, game starts
    }

    getAttires(player) {
        // return set of attires from database
    }

    render() {
        /*
        const attires = // get set of attires from database 
        const helmets = attires.helmets; // array of helmets
        const visors = attires.visors;
        const suits = attires.suits;
        const gloves = attires.gloves;
        const boots = attires.boots;
        */
        
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Pick Your Attire.</legend>
                <label>
                    {"Helmet: "}
                    <select value={this.state.value} onChange={e => this.handleChange(e, "helmet")}>
                        <option value="white">{ "white"/* helmets[0] */} </option>
                        <option value="red">{"red"/* helmets[1] */}</option>
                        <option value="yellow">{"yellow"/* helmets[2] */}</option>
                    </select>
                </label>
                
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class GamePlay extends React.Component {

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
        
        // When game begins, assgin roles.
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
        set(rolesRef, {shuffledRoles});
    }

    render() {
        /*
        if (!this.state.gameStarted) {

            // return <ChooseAttires />;
        } else {
            return <GamePlay />;
        }
        */
        return (
            <div>
                Game Begins!
            </div>
        );
    }
}

export { ChooseAttires, TestingShuffle, Game };


///////////////////////////////////////////
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