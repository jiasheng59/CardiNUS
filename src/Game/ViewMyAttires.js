import { onValue, ref } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../firebase/fire";
import ReactModal from "react-modal";
import { getPlayerIndex } from "./Game";
import { Attire } from "./Attire";

class ViewMyAttires extends React.Component {
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
        this.getCurrentAttires = this.getCurrentAttires.bind(this);
        this.getOriginalAttires = this.getOriginalAttires.bind(this);
    }
    componentDidMount() {
        this.getCurrentAttires();
    }
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    getCurrentAttires() {
        let currentAttires;
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        onValue(r, snapshot => {
            currentAttires = snapshot.val()
                .currentAttires[getPlayerIndex(this.props.roomId, auth.currentUser.uid)];
            this.setState({
                helmet: currentAttires[0].color,
                visor: currentAttires[1].color,
                suit: currentAttires[2].color,
                gloves: currentAttires[3].color,
                boots: currentAttires[4].color
            });
        });
        /*
        return (
            <div>
                <Attire attire={"Helmet"} color={this.state.helmet}></Attire>
                <Attire attire={"Visor"} color={this.state.visor}></Attire>
                <Attire attire={"Suit"} color={this.state.suit}></Attire>
                <Attire attire={"Gloves"} color={this.state.gloves}></Attire>
                <Attire attire={"Boots"} color={this.state.boots}></Attire>
            </div>
        );
        */
    }
    getOriginalAttires() {
        let originalAttires;
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        onValue(r, snapshot => {
            originalAttires = snapshot.val().originalAttires[getPlayerIndex(this.props.roomId, auth.currentUser.uid)];
        }, { onlyOnce: true });
        return (
            <div>
                <Attire attire={"Helmet"} color={originalAttires[0].color}></Attire>
                <Attire attire={"Visor"} color={originalAttires[1].color}></Attire>
                <Attire attire={"Suit"} color={originalAttires[2].color}></Attire>
                <Attire attire={"Gloves"} color={originalAttires[3].color}></Attire>
                <Attire attire={"Boots"} color={originalAttires[4].color}></Attire>
            </div>
        );
    }
        
    render() {
        const originalAttiresElement = this.getOriginalAttires();
        return (
            <div>
                <button disabled={false} onClick={this.handleOpenModal}>View My Attires</button>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>Your attires</h2>
                    <h3>Current</h3>
                    <div>
                        <Attire attire={"Helmet"} color={this.state.helmet}></Attire>
                        <Attire attire={"Visor"} color={this.state.visor}></Attire>
                        <Attire attire={"Suit"} color={this.state.suit}></Attire>
                        <Attire attire={"Gloves"} color={this.state.gloves}></Attire>
                        <Attire attire={"Boots"} color={this.state.boots}></Attire>
                    </div>
                    <h3>Original</h3>
                    {originalAttiresElement}
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

export default ViewMyAttires;