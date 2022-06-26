import { useState } from "react";
import Hero from "./Hero";
import WaitingRoom from "./WaitingRoom";
import GamePage from "../Game/GamePage";

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
            ):(!started ? (
                <WaitingRoom
                    roomId={roomId}
                    setStarted={setStarted}
                    setRoomId={setRoomId}
                    setJoined={setJoined}
                />
            ):(
                <GamePage roomId={roomId}></GamePage>
            )
        )}
        </>
    )
}

export default Home;