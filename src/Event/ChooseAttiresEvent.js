import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';
import { auth, rtdb } from "../firebase/fire";
import { onValue, ref, set } from "firebase/database";
import { doneAction, getPlayerIndex, isReadyToChangePhase, setDoneToZero } from "../Game/Game";

// red, yellow, blue, turquoise, purple

function setOriginalAttires(roomId, playerIndex, attires) {
    /*
    TODO: 
    Debug pleaseee (facing the same problem of the previous players' attires disappear)
    This function is to update the originalAttires in database.
    */
   
    const r = ref(rtdb, '/games/' + roomId + '/gameInfo/originalAttires');
    let tempOriAttires = {};
    onValue(r, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            tempOriAttires = data;
        } else {
            tempOriAttires = {};
        }
    }, { onlyOnce: true });
    tempOriAttires[playerIndex] = attires;
    set(ref(rtdb, '/games/' + roomId + '/gameInfo/originalAttires'), tempOriAttires);
    set(ref(rtdb, '/games/' + roomId + '/gameInfo/currentAttires'), tempOriAttires);
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
                setDoneToZero(this.props.roomId);
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