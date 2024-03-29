import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { onValue, set, ref } from "firebase/database";
import { isReadyToChangePhase, getPlayerIndex, doneAction, getAlienIndex, setDoneToZero } from "../Game/Game";
import { auth, rtdb } from "../firebase/fire";

function hasSwapppedAll(roomId) {
    // Check if the alien has swapped all attires. Returns a boolean.
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
    let currentAttires;
    let originalAttires;
    onValue(r, snapshot => {
        const data = snapshot.val();
        originalAttires = data.originalAttires;
        currentAttires = data.currentAttires;
    }, { onlyOnce: true });
    const alienCurrentAttires = currentAttires[getAlienIndex(roomId)].map(a => a.color);
    const alienOriginalAttires = originalAttires[getAlienIndex(roomId)].map(a => a.color);
    var allSwapped = true
    for (let i = 0; i < alienCurrentAttires.length; i++) {
        if (alienCurrentAttires[i] === alienOriginalAttires[i]) {
            allSwapped = false;
        }
    }
    return allSwapped;
}

class NightEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { swap: false, showModal: false, player: 1, attire: "helmet" };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onSelectAttire = this.onSelectAttire.bind(this);
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
        this.attireToIndex = this.attireToIndex.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
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
        this.setState({ swap: true });
        this.handleCloseModal();
        alert("You have swapped your " + this.state.attire + " with Player " + this.state.player);
        event.preventDefault();
        const myIndex = getPlayerIndex(this.props.roomId, auth.currentUser.uid);
        const yourRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/currentAttires/' + myIndex + '/' + this.attireToIndex(this.state.attire));
        const hisRef = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo/currentAttires/' + (this.state.player - 1).toString() + '/' + this.attireToIndex(this.state.attire));
        let hisAttireColor= "";
        let yourAttireColor="";

        onValue(hisRef, (snapshot) => {
            hisAttireColor = snapshot.val().color;
        }, {onlyOnce: true}); 
        
        let hisAttire = {color: hisAttireColor, name: this.state.attire};
        onValue(yourRef, (snapshot) => {
            yourAttireColor = snapshot.val().color;
        }, {onlyOnce:true}); 
        let yourAttire = {color: yourAttireColor, name: this.state.attire}
        set(hisRef, yourAttire);
        set(yourRef, hisAttire);
        
        doneAction(this.props.roomId);
        if (isReadyToChangePhase(this.props.roomId)) {
            if (hasSwapppedAll(this.props.roomId)) {
                this.props.changePhase("Alien And Mr. D Win");
            } else {
                this.props.changePhase("Discussion");
            }
            setDoneToZero(this.props.roomId);
        } else {
            console.log("Not ready");
        }
    }

    handleSkip(event) {
        this.handleCloseModal();
        event.preventDefault();
        doneAction(this.props.roomId);
        if (isReadyToChangePhase(this.props.roomId)) {
            if (hasSwapppedAll(this.props.roomId)) {
                this.props.changePhase("Alien And Mr. D Win");
            } else {
                this.props.changePhase("Discussion");
            }
            setDoneToZero(this.props.roomId);
        } else {
            console.log("Not ready");
        }
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
                <button disabled={this.state.swap} onClick={this.handleOpenModal}>Change Attire</button>
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
                    <button onClick={this.handleSkip}>Skip</button>
                </ReactModal>
            </div>
        );
    }
}

export default NightEvent;