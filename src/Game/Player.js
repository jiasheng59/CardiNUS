import React from 'react';
import ReactModal from 'react-modal';
import { getPlayerIndex } from "./Game";
import { auth } from "../fire";
import "./Player.css";

class Player extends React.Component {
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
        const playerIndex = getPlayerIndex(this.props.roomId, auth.currentUser.uid);
        let button;
        if (playerIndex === this.props.number - 1) {
            button = (
                <button className='you' onClick={this.handleOpenModal}>
                    {"Player " + this.props.number + ": " + this.props.name + " (You)"}
                </button>
            );
        } else {
            button = (
                <button className='otherPlayers' onClick={this.handleOpenModal}>
                    {"Player " + this.props.number + ": " + this.props.name}
                </button>
            );
        }

        return (
            <div>
                {button}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="showAttire">
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

export default Player;