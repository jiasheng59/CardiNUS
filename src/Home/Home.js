import { useState } from "react";
import Hero from "./Hero";
import WaitingRoom from "./WaitingRoom";

function Home({handleLogout, playerId, setPlayerId}) {
    const [joined, setJoined] = useState(false);
    const [started, setStarted] = useState(false);
    const [roomId, setRoomId] = useState();


    return (
        <>
        {!joined ? (
            <Hero
                handleLogout={handleLogout} 
                playerId={playerId}
                setPlayerId={setPlayerId}
                setJoined={setJoined}
                setRoomId={setRoomId}
            />
            ):(
            <WaitingRoom
                roomId={roomId}
                setStarted={setStarted}
                setRoomId={setRoomId}
                setJoined={setJoined}
            />
        )}
        </>
    )
}

export default Home;