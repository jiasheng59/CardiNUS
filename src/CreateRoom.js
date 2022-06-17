import React from 'react';
import { rtdb, auth } from "./fire";
import { push, ref } from 'firebase/database';

function CreateRoom({ setRoomId, setJoined }) {
    /*
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    */

    function createRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;

        const roomInfo = {
            host: uid,
            players:[uid],
        };
        const key = push(ref(rtdb, "/games"), roomInfo).key;
        alert(key);
        setRoomId(key);
        setJoined(true);
    }

    /*
    async function createRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;
        
        await db.collection('gameroom').add({
            host: uid,
            players: [uid, "", "", "", ""]
        }).then(docRef => {setRoomId(docRef.id)})

        setJoined(true);
    }
    */



    return (
        <button onClick={createRoom}>Create Room</button>
    )
}

export default CreateRoom;