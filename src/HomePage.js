import React from "react";
    
function CreateRoom() {
    return (
        <button name="CreateRoom">
            Create Room
        </button>
    );
}

function JoinRoom() {
    return (
        <button>Join Room</button>
    );
}

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <CreateRoom></CreateRoom>
                <JoinRoom></JoinRoom>
            </div>
        );
    }
}

export default HomePage