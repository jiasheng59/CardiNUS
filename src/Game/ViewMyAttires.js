import { onValue, ref, set } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../firebase/fire";
import ReactModal from "react-modal";

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
    
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    getCurrentAttires() {
        // TODO: 
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
        onValue(r, snapshot => {

        })
    }
    getOriginalAttires() {
        // TODO: 
        const r = ref(rtdb, '/games/' + this.props.roomId + '/gameInfo');
    }
        
    render() {
        const currentAttires = this.getCurrentAttires();
        const originalAttires = this.getOriginalAttires();
        
        return (
            <div>
                <button disabled={false} onClick={this.handleOpenModal}>View My attires</button>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>View my attires.</h2>
                    <h3>Current</h3>
                    <div>

                    </div>
                    <h3>Original</h3>
                    <div>

                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ViewMyAttires;