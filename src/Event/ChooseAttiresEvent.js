import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { auth, rtdb } from "../fire";
import { onValue, ref, set } from "firebase/database";
import { doneAction, getPlayerIndex, isReadyToChangePhase } from "../Game/Game";

// red, yellow, blue, turquoise, purple

function setOriginalAttires(roomId, playerIndex, attires) {
    /*
    TODO: 
    Debug pleaseee (facing the same problem of the previous players' attires disappear)
    This function is to update the originalAttires in database.
    */
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
    let tempIndex = {};
    let tempRole = [];
    let tempOriAttires = {};
    let tempDone;
    let tempPhase;
    onValue(r, (snapshot) => {
        if (snapshot.exists) {
            const data = snapshot.val();
            data.originalAttires[playerIndex] = attires;
            tempIndex = data.mapIndex;
            tempRole = data.roles;
            tempOriAttires = data.originalAttires;
            tempDone = data.done;
            tempPhase = data.phase;
        } else {
            console.log("fail");
        }
    }, { onlyOnce: true });
    const tempGameInfo = {
        roles: tempRole,
        mapIndex: tempIndex,
        originalAttires: tempOriAttires,
        done: tempDone,
        phase: tempPhase
    }
    set(r, tempGameInfo);
}

class ChooseAttiresEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            helmet: "",
            visor: "",
            suit: "",
            gloves: "",
            boots: ""
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    componentDidMount() {
        this.handleOpenModal();
    }
    
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    onSelect(item, selectedItem) {
        switch (item) {
            case "helmet":
                this.setState({ helmet: selectedItem.id });
                break;
            case "visor":
                this.setState({ visor: selectedItem.id });
                break;
            case "suit":
                this.setState({ suit: selectedItem.id });
                break;
            case "gloves":
                this.setState({ gloves: selectedItem.id });
                break;
            case "boots":
                this.setState({ boots: selectedItem.id });
                break;
            default:
        }
    }

    handleDone(event) {
        if (this.state.helmet === ""
            || this.state.visor === ""
            || this.state.suit === ""
            || this.state.gloves === ""
            || this.state.boots === "") {
            alert("You have not chosen all attires");
        } else {
            this.handleCloseModal();
            const playerIndex = getPlayerIndex(this.props.roomId, auth.currentUser.uid);
            const originalAttires = [
                { name: "helmet", color: this.state.helmet },
                { name: "visor", color: this.state.visor },
                { name: "suit", color: this.state.suit },
                { name: "gloves", color: this.state.gloves },
                { name: "boots", color: this.state.boots }
            ];
            alert("You have chosen your attires.");
            doneAction(this.props.roomId);
            if (isReadyToChangePhase(this.props.roomId)) {
                this.props.changePhase("Night");
            }
            // Update database
            setOriginalAttires(this.props.roomId, playerIndex, originalAttires);
            event.preventDefault();
        }
    }
        
    render() {
        const colors = [
            { name: "Red", id: "red" },
            { name: "Yellow", id: "yellow" },
            { name: "Blue", id: "blue" },
            { name: "Turquoise", id: "turquoise" },
            { name: "Purple", id: "purple" },
        ];
        return (
            <div>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>Choose your attires.</h2>
                    <form>
                        <h3>Helmet.</h3>
                        <Multiselect
                            options={colors}
                            onSelect={(selectedList, selectedItem) => {
                                this.onSelect("helmet", selectedItem);
                            }}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                        <h3>Visor.</h3>
                        <Multiselect
                            options={colors}
                            onSelect={(selectedList, selectedItem) => {
                                this.onSelect("visor", selectedItem);
                            }}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                        <h3>Suit.</h3>
                        <Multiselect
                            options={colors}
                            onSelect={(selectedList, selectedItem) => {
                                this.onSelect("suit", selectedItem);
                            }}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                        <h3>Gloves.</h3>
                        <Multiselect
                            options={colors}
                            onSelect={(selectedList, selectedItem) => {
                                this.onSelect("gloves", selectedItem);
                            }}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                        <h3>Boots.</h3>
                        <Multiselect
                            options={colors}
                            onSelect={(selectedList, selectedItem) => {
                                this.onSelect("boots", selectedItem);
                            }}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />
                    </form>
                    <button onClick={this.handleDone}>Done</button>
                </ReactModal>
            </div>
        );
    }
}

export default ChooseAttiresEvent;