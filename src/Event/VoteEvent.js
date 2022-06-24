import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { doneAction, getAlienIndex } from "../Game/Game";

// Remark: Eliminate player feature will be implemented by milestone 3

// getHighestVote and setVote are used for both Captain and Alien voting
function getHighestVote(roomId) {
    let tempVote = [];
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
    onValue(r, (snapshot) => {
        if (snapshot.exists) {
            const data = snapshot.val();
            tempVote = data.vote;
        } else {
            console.log("fail");
        }
    });

    let arr = [];
    for (let i = 0; i < tempVote.length; i = i + 1) {
        arr[i] = [i, tempVote[i]];
    }
    arr.sort((a, b) => a[1] - b[1]);
    if (arr[tempVote.length - 1][1] === arr[tempVote.length - 2][1]) { // draw
        return -1;
    } else {
        return arr[tempVote.length - 1][0];
    }
}
function setVote(roomId, votedPlayerIndex) {
    // TODO: update vote array in database, the array name should be called vote
}
function setVoteToZero(roomId) {
    // TODO: set the vote array in database to [] / {}, depending on your implementation
}

class VoteForCaptainEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, captain: ""};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }  
    
    handleOpenModal () {
        this.setState({ showModal: true });
    }   
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    handleVote(event) {
        if (this.state.captain === "") {
            alert("Please choose one player.");
            return;
        }
        // and update database
        this.handleCloseModal();
        alert("You have voted for Player " + this.state.captain + " to be the Captain.");

        this.props.changePhase("Captain time");
        event.preventDefault();
    }
    onSelect(selectedList, selectedItem) {
        this.setState({ captain: selectedItem.id });
    }
    
    render() {
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
                <button disabled={false} onClick={this.handleOpenModal}>Vote a Captain</button>
                <ReactModal isOpen={this.state.showModal}>
                    <form>
                        <h3>Vote a Captain.</h3>
                        <Multiselect
                            options={players}
                            onSelect={this.onSelect}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                    </form>
                    <button onClick={this.handleVote}>Vote</button>
                </ReactModal>
            </div>
        );
    }
}

class VoteForAlienEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, alien: ""};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.updateVote = this.updateVote.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }  
    
    handleOpenModal () {
        this.setState({ showModal: true });
    }   
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    handleVote(event) {
        if (this.state.captain === "") {
            alert("Please choose one player.");
            return;
        }
        this.handleCloseModal();
        this.updateVote();
        
        alert("You have voted for Player " + this.state.alien + ".");
        event.preventDefault();
    }
    onSelect(selectedList, selectedItem) {
        this.setState({ alien: selectedItem.id });
    }

    updateVote() { // Update database (vote), phase
        setVote(this.props.roomId, this.state.alien - 1);
        doneAction(this.props.roomId);
        const alienIndex = getAlienIndex(this.props.roomId);

        if (isReadyToChangePhase(this.props.roomId)) {
            if (getHighestVoteAlien(this.props.roomId) === alienIndex) {
                this.props.changePhase("Astronauts Win");
            } else {
                this.props.changePhase("Night");
            }
            setVoteToZero(this.props.roomId);
        }
    }
    
    render() {
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
                <button disabled={false} onClick={this.handleOpenModal}>Vote for Alien</button>
                <ReactModal isOpen={this.state.showModal}>
                    <form>
                        <h3>Vote for Alien. The player with highest vote will be eliminated.</h3>
                        <Multiselect
                            options={players}
                            onSelect={this.onSelect}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                    </form>
                    <button onClick={this.handleVote}>Vote</button>
                </ReactModal>
            </div>
        );
    }
}

export { VoteForCaptainEvent, VoteForAlienEvent };