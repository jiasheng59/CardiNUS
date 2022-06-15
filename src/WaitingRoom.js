import { useState, useEffect } from "react";
import { rtdb } from "./fire";
import { ref, onValue} from "firebase/database";
import GamePage from "./Game/GamePage";

function WaitingRoom({roomId}) {
    const [roomInfo, setRoomInfo] = useState("");
    const [players, setPlayers] = useState([]);
    

    useEffect(() => {
        const gameRef = ref(rtdb, '/games/' + roomId);
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            setPlayers(data.players)
        });
    },[]);

    return(
        <div>
            <div>
                Room ID: {roomId}
            </div>
            <div>
                Player List:
                {players.map(player => (
                    <div>
                        {player}
                    </div>
                ))}
            </div>
            <GamePage roomId={roomId}></GamePage>
        </div>
    );
}

export default WaitingRoom;