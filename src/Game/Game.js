import React, { useState } from "react";
import ReactModal from 'react-modal';

const helmet = ['r', 'y', 'b', 't', 'p']; // red, yellow, blue, turquoise, purple
const visor = ['r', 'y', 'b', 't', 'p'];
const suit = ['r', 'y', 'b', 't', 'p'];
const gloves = ['r', 'y', 'b', 't', 'p'];
const boots = ['r', 'y', 'b', 't', 'p'];

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

const roles = ["astronaut", "alien", "mrD", "astronaut", "astronaut", "astronaut", "astronaut"];
function TestingShuffle() {
    const roles = ["alien", "mrD", "astronaut", "astronaut", "astronaut", "astronaut", "astronaut"];
    const shuffledRoles = shuffle(roles).map(n => <li>{n}</li>);
    return (
        <ul>
            {shuffledRoles}
        </ul>
    );
}

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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarts: false
        };
        this.assignRoles();
    }

    assignRoles() {
        // const roles = some permutation
        // update database to assign role to each player
    }

    render() {
        if (!this.state.gameStarts) {
            return <ChooseAttires />;
        } else {
            return <GamePlay />;
        }
    }
}

export { ChooseAttires, TestingShuffle };