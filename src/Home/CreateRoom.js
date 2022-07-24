import React from 'react';
import { rtdb, auth } from "../firebase/fire";
import { push, ref } from 'firebase/database';
import InboxIcon from '@mui/icons-material/Inbox';

function CreateRoom({ setRoomId, setJoined, playerId }) {

    function createRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;

        const roomInfo = {
            gameInfo: [-1],
            host: uid,
            players:[uid],
            playersId: [playerId],
            ready: [false, false, false, false, false, false, false]
        };
        const key = push(ref(rtdb, "/games"), roomInfo).key;
        alert(key);
        setRoomId(key);
        setJoined(true);
    }



    return (
        <button onClick={createRoom}>Create Room <InboxIcon className="icon" /></button>
    )
}

export default CreateRoom;