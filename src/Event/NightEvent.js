import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { onValue, set, ref } from "firebase/database";
import { getPlayerIndex } from "../Game/Game";
import { auth, rtdb } from "../fire";

class NightEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, player: 1, attire: "helmet" };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onSelectAttire = this.onSelectAttire.bind(this);
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
        this.attireToIndex = this.attireToIndex.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
    }
    
    // Modal
    handleOpenModal() {
        this.setState({ showModal: true });
    }
        
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    onSelectAttire(selectedList, selectedItem) {
        this.setState({ attire: selectedItem.id });
    }

    onSelectPlayer(selectedList, selectedItem) {
        this.setState({ player: selectedItem.id });
    }

    attireToIndex(attire) {
        if (attire === "helmet") {
            return 0;
        }
        if (attire === "visor") {
            return 1;
        }
        if (attire === "suit") {
            return 2;
        }
        if (attire === "gloves") {
            return 3;
        }
        if (attire === "boots") {
            return 4;
        }
    }
    
    handleSwap(event) {
        // Client side
        this.handleCloseModal();
        alert("You have swapped your " + this.state.attire + " with Player " + this.state.player);
        event.preventDefault();

        /*
        TODO: 
        This function is to handle the attires change of two players in database.
        */
        
        // Update database
        /*
        const yourRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/orginalAttires/' + getPlayerIndex(this.props.roomId, auth.currentUser.uid) + '/' + this.attireToIndex(this.state.attire));
        const hisRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/orginalAttires/' + (this.state.player - 1).toString() + '/' + this.attireToIndex(this.state.attire));
        let hisAttireColor;
        let yourAttireColor; 
        onValue(hisRef, (snapshot) => {
            hisAttireColor = snapshot.val().color;
        }); 
        onValue(yourRef, (snapshot) => {
            alert(snapshot.val().toString());
            yourAttireColor = snapshot.val().color;
        });
        set(hisRef, yourAttireColor);
        set(yourRef, hisAttireColor);
        */
        
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
                <button disabled={false} onClick={this.handleOpenModal}>Change Attire</button>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>Do you want to swap your attire?</h2>
                    <form>
                        <h3>Pick the attire you want to swap.</h3>
                        <Multiselect
                            options={attires}
                            onSelect={this.onSelectAttire}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />

                        <h3>Choose the player you want to swap with.</h3>
                        <Multiselect
                            options={players}
                            onSelect={this.onSelectPlayer}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                    </form>
                    <button onClick={this.handleSwap}>Swap</button>
                    <button onClick={this.handleCloseModal}>Skip</button>
                </ReactModal>
            </div>
        );
    }
}

export default NightEvent;