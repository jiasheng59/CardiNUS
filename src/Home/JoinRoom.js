import { ref, onValue, set } from 'firebase/database';
import React, { useState } from 'react';
import { rtdb, auth } from "../firebase/fire";

function JoinRoom({setRoomId, setJoined, playerId}) {
    
    const [joinId, setJoinId] = useState("");

    function joinRoom(e) {
        e.preventDefault();
        const { uid } = auth.currentUser;

        const gameRef = ref(rtdb, '/games/' + joinId);
        onValue(gameRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoomId(joinId)
                const data = snapshot.val();
                if(!data.players.includes(uid)) {
                    set(gameRef, {
                        gameInfo: data.gameInfo,
                        host: data.host,
                        players: [...data.players, uid],
                        playersId: [...data.playersId, playerId],
                        ready : data.ready
                    })
                }
                setJoined(true)
            }else{
                alert("Invalid Room Id")
            }
        }, {onlyOnce: true});

    }
 

    return (
        <div>
        <form onSubmit={joinRoom}>
            <input
                type="text" 
                value={joinId} 
                onChange={e => setJoinId(e.target.value)}
            />
            <input type="submit" value="Join"/>
        </form>
      </div>
    )
}

export default JoinRoom;