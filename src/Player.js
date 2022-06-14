import React from "react";

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
                <button onClick={this.handleOpenModal}>{this.props.name}</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="showAttire">
                    <button onClick={this.handleCloseModal}>close</button>
                </ReactModal>
            </div>
        );
    }
}

export default Player;