import React, { useState } from "react";
import ReactModal from 'react-modal';
import firebase from "firebase/compat/app";

const helmet = ['p', 'r', 'y', 'b', 't']; // purple, red, yellow, blue, turquoise
const visor = ['p', 'r', 'y', 'b', 't'];
const suit = ['p', 'r', 'y', 'b', 't'];
const gloves = ['p', 'r', 'y', 'b', 't'];
const boots = ['p', 'r', 'y', 'b', 't'];

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

class NightEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
          
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
        
    handleOpenModal () {
        this.setState({ showModal: true });
    }
        
    handleCloseModal() {
        this.setState({ showModal: false });
    }
        
    render() {
        return (
            <div>
              <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example">
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
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

{/*
<label>
                    {"Visor: "}
                    <select value={this.state.value} onChange={e => this.handleChange(e, "visor")}>
                    <option value="white">{} </option>
                        <option value="red">{}</option>
                        <option value="yellow">{}</option>
                    </select>
                </label>
                <label>
                    {"Suit: "}
                    <select value={this.state.value} onChange={e => this.handleChange(e, "suit")}>
                        <option value="white">{} </option>
                        <option value="red">{}</option>
                        <option value="yellow">{}</option>
                    </select>
                </label>
                <label>
                    {"Gloves: "}
                    <select value={this.state.value} onChange={e => this.handleChange(e, "gloves")}>
                        <option value="white">{} </option>
                        <option value="red">{}</option>
                        <option value="yellow">{}</option>
                    </select>
                </label>
                <label>
                    {"Boots: "}
                    <select value={this.state.value} onChange={e => this.handleChange(e, "boots")}>
                        <option value="white">{} </option>
                        <option value="red">{}</option>
                        <option value="yellow">{}</option>
                    </select>
                </label>

*/}

const num = [1, 2, 3, 4, 5];
function TestingShuffle() {
    const array = shuffle(shuffle(num)).map(n => <li>{n}</li>);
    return (
        <ul>
            {array}
        </ul>
    );
}
export { ChooseAttires, TestingShuffle };