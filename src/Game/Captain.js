import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { getAlienIndex, getPlayerIndex, setDoneToZero } from "./Game";
import { auth, rtdb } from "../firebase/fire";
import { onValue, ref } from "firebase/database";

class Inspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, attire: "", selectedPlayers: [], view: false};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleVoteForAlien = this.handleVoteForAlien.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.onSelectAttire = this.onSelectAttire.bind(this);
        this.onSelectPlayers = this.onSelectPlayers.bind(this);
        this.onRemovePlayers = this.onRemovePlayers.bind(this);
    }

    // Modal
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    handleView(event) {
        this.setState({ view: true });
        const players = this.state.selectedPlayers;
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/currentAttires');
        let colors;
        onValue(r, (snapshot) => {
            colors = snapshot.val();
        }, {onlyOnce: true}); 
        const message =
            "The " + this.state.attire + ` of players ${players[0]}, ${players[1]}, ${players[2]} are: 
            ${colors[players[0] - 1].color}, 
            ${colors[players[1] - 1].color}, 
            ${colors[players[2] - 1].color} respectively. The ${this.state.attire} of alien is ${colors[getAlienIndex(this.props.roomId)].color}.`;
        alert(message);
    }
    handleVoteForAlien(event) {
        this.handleCloseModal();
        setDoneToZero(this.props.roomId);
        this.props.changePhase("Vote For Alien");
    }
    handleSkip(event) {
        this.handleCloseModal();
        setDoneToZero(this.props.roomId);
        this.props.changePhase("Night");
    }
    handleEscape(event) {
        this.handleCloseModal();
        setDoneToZero(this.props.roomId);
        if (getPlayerIndex(this.props.roomId, auth.currentUser.uid) === getAlienIndex(this.props.roomId)) {
            this.props.changePhase("Alien And Mr. D Win");
        } else {
            alert("You are not Alien!");
            // To be implemented: eliminate the player if he is not the Alien but press escape
            this.props.changePhase("Night");
        }
    }
 
    onSelectAttire(selectedList, selectedItem) {
        this.setState({ attire: selectedItem.id });
    }
    onSelectPlayers(selectedList, selectedItem) {
        this.setState({ selectedPlayers: selectedList.map(arr => arr.id) });
    }
    onRemovePlayers(selectedList, removedItem) {
        this.setState({ selectedPlayers: selectedList.map(arr => arr.id) });
    }
    
    render() {
        const attires = [
            { name: "Helmet", id: "helmet" },
            { name: "Visor", id: "visor" },
            { name: "Suit", id: "suit" },
            { name: "Gloves", id: "gloves" },
            { name: "Boots", id: "boots" },
        ];
        const players = [
            { name: "Player 1", id: 1 },
            { name: 'Player 2', id: 2 },
            { name: "Player 3", id: 3 },
            { name: "Player 4", id: 4 },
            { name: "Player 5", id: 5 },
            { name: "Player 6", id: 6 },
            { name: "Player 7", id: 7 },
        ];
        return (
            <div>
                <button disabled={false} onClick={this.handleOpenModal}>Inspect Players' Attires</button>
                <ReactModal isOpen={this.state.showModal}>
                    <form>
                        <h2>
                            You are elected as Captain in this round. You may view three players' attire.
                            The Alien's attires are shown below.
                        </h2>
                        <h3>Choose an attire.</h3>
                        <Multiselect
                            options={attires}
                            onSelect={this.onSelectAttire}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />

                        <h3>Choose three players.</h3>
                        <Multiselect
                            options={players}
                            onSelect={this.onSelectPlayers} 
                            onRemove={this.onRemovePlayers} 
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            selectionLimit={3}
                        />
                    </form>
                    <button disabled={this.state.view} onClick={this.handleView}>View</button>
                    <button onClick={this.handleVoteForAlien}>Vote For Alien</button>
                    <button onClick={this.handleSkip}>Skip Voting Phase</button>
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

export default Inspect;
