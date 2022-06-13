import React from "react";
import ReactModal from "react-modal";

class NightEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
          
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
        
    handleOpenModal () {
        this.setState({ showModal: true });
    }
        
    handleCloseModal() {
        this.setState({ showModal: false });
    }
        
    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Change Attire</button>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>Do you want to swap your attire?</h2>
                    <button onClick={this.handleCloseModal}>Swap</button>
                    <button onClick={this.handleCloseModal}>Skip</button>
                </ReactModal>
            </div>
        );
    }
}

export default NightEvent