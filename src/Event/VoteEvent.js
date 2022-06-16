import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
/*
function vote(room, player) {
    // this player count + 1;
}

function eliminated(room) {
    // for all players in the room, the player with the highest vote is elimated/becomes captain
}
*/

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
/*
class VoteForAlienEvent extends React.Component {
    constructor(props) {
        super(props);
    }
        
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
*/
export default VoteForCaptainEvent;