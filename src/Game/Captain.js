import React from "react";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';

class Inspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, attire: "", selectedPlayers: []};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleView = this.handleView.bind(this);
        this.onSelectAttire = this.onSelectAttire.bind(this);
        this.onSelectPlayers = this.onSelectPlayers.bind(this);
        this.onRemovePlayers = this.onRemovePlayers.bind(this);
    }

    // Modal
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    handleView(event) {
        /*
        const players = this.state.selectedPlayers;
        const message =
            "The " + this.state.attire + " of players ${players[0]}, ${players[1]}, ${players[2]}" + "are: " + " respectively";
        alert(message);
        */
        this.handleCloseModal();
    }

    onSelectAttire(selectedList, selectedItem) {
        this.setState({ attire: selectedItem.id });
    }
    onSelectPlayers(selectedList, selectedItem) {
        this.setState({ selectedPlayers: selectedList.map(arr => arr.id) });
    }
    onRemovePlayers(selectedList, removedItem) {
        this.setState({ selectedPlayers: selectedList.map(arr => arr.id) });
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
                <button disabled={false} onClick={this.handleOpenModal}>Inspect Players' Attires</button>
                <ReactModal isOpen={this.state.showModal}>
                    <form>
                        <h2>
                            You are elected as Captain in this round. You may view three players' attire.
                            The Alien's attires are shown below.
                        </h2>
                        <h3>Choose an attire.</h3>
                        <Multiselect
                            options={attires}
                            onSelect={this.onSelectAttire}
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            singleSelect={true}
                        />

                        <h3>Choose three players.</h3>
                        <Multiselect
                            options={players}
                            onSelect={this.onSelectPlayers} 
                            onRemove={this.onRemovePlayers} 
                            displayValue="name"
                            avoidHighlightFirstOption={true}
                            selectionLimit={3}
                        />
                    </form>
                    <button onClick={this.handleView}>View</button>
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

export default Inspect;
