import React from "react";

const helmet = ['w', 'r', 'y', 'b', 't'];
const visor = ['w', 'r', 'y', 'b', 't'];
const suit = ['w', 'r', 'y', 'b', 't'];
const gloves = ['w', 'r', 'y', 'b', 't'];
const boots = ['w', 'r', 'y', 'b', 't'];

function ChooseAttires(props) {
    return (
        <form>

        </form>
    );
}

class GamePlay extends React.Component {

}

class Game extends React.Component {
    constructor(props) {
        this.state = { gameStarts: false, roleOfPlayers: [] };
        this.assignRoles();
    }

    assignRoles() {
        const roles = // some permutation
        this.setState({ roleOfPlayers: roles });
    }

    render() {
        if (!this.state.gameStarts) {
            return <ChooseAttires />;
        } else {
            return <GamePlay />;
        }
    }
}