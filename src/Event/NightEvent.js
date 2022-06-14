import React from "react";
import ReactModal from "react-modal";
import "./NightEvent.css";

class NightEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, player: 1, attire: "helmet"};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChangeAttire = this.handleChangeAttire.bind(this);
        this.handleChangePlayer = this.handleChangePlayer.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
    }  
    
    // Modal
    handleOpenModal () {
        this.setState({ showModal: true });
    }
        
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    // Form
    handleChangeAttire(event) {
        this.setState({ attire: event.target.value });
    }

    handleChangePlayer(event) {
        this.setState({ player: event.target.value });
    }
    
    handleSwap(event) {
        // and update database
        this.handleCloseModal();
        alert("You has swapped your " + this.state.attire + " with Player " + this.state.player);
        event.preventDefault();
    }
        
    render() {
        return (
            <div>
                <button disabled={false} onClick={this.handleOpenModal}>Change Attire</button>
                <ReactModal isOpen={this.state.showModal}>
                    <h2>Do you want to swap your attire?</h2>
                    <form>
                        <h3>Pick the attire you want to swap.</h3>
                        <select value={this.state.attire} onChange={this.handleChangeAttire}>
                            <option value="helmet">Helmet</option>
                            <option value="visor">Visor</option>
                            <option value="suit">Suit</option>
                            <option value="gloves">Gloves</option>
                            <option value="boots">Boots</option>
                        </select>
                        
                        <br />

                        <h3>Choose the player you want to swap with</h3>
                        <select value={this.state.player} onChange={this.handleChangePlayer}>
                            <option value={1}>Player 1</option>
                            <option value={2}>Player 2</option>
                            <option value={3}>Player 3</option>
                            <option value={4}>Player 4</option>
                            <option value={5}>Player 5</option>
                            <option value={6}>Player 6</option>
                            <option value={7}>Player 7</option>
                        </select>

                    </form>
                    <button onClick={this.handleSwap}>Swap</button>
                    <button onClick={this.handleCloseModal}>Skip</button>
                </ReactModal>
            </div>
        );
    }
}

export default NightEvent;