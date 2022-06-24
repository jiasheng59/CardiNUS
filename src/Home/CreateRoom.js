import React from 'react';
import { rtdb, auth } from "../firebase/fire";
import { push, ref } from 'firebase/database';

function CreateRoom({ setRoomId, setJoined, playerId }) {

    function createRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;

        const roomInfo = {
            gameInfo: [null],
            host: uid,
            players:[uid],
            playersId: [playerId],
            ready: [true, false, false, false, false, false]
        };
        const key = push(ref(rtdb, "/games"), roomInfo).key;
        alert(key);
        setRoomId(key);
        setJoined(true);
    }



    return (
        <button onClick={createRoom}>Create Room</button>
    )
}

export default CreateRoom;