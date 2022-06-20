import React from 'react';
import { rtdb, auth } from "./fire";
import { push, ref } from 'firebase/database';

function CreateRoom({ setRoomId, setJoined }) {

    function createRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;

        const roomInfo = {
            gameInfo: [null],
            host: uid,
            players:[uid],
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