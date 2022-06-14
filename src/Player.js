import React from 'react';
import ReactModal from 'react-modal';

class Player extends React.Component {
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
                <button onClick={this.handleOpenModal}>
                    {"Player " + this.props.number + ": " + this.props.name}
                </button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="showAttire">
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

export default Player;