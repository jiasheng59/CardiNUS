import React from "react";
import ReactModal from 'react-modal';
import firebase from "firebase/compat/app";

const helmet = ['w', 'r', 'y', 'b', 't'];
const visor = ['w', 'r', 'y', 'b', 't'];
const suit = ['w', 'r', 'y', 'b', 't'];
const gloves = ['w', 'r', 'y', 'b', 't'];
const boots = ['w', 'r', 'y', 'b', 't'];

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

export default NightEvent;