import { onValue, ref, set } from "firebase/database";
import React from "react";
import { rtdb, auth } from "../fire";

class ViewMyAttires extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
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
        const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
        onValue(r, snapshot => {

        })
    }
    getOriginalAttires() {
        const r = ref(rtdb, '/games/' + roomId + '/gameInfo');
    }
        
    render() {
        const currentAttires = this.getCurrentAttires();
        const originalAttires = this.getOriginalAttires();
        
        return (
            <div>
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

export default ChooseAttiresEvent;