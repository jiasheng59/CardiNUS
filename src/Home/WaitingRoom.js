import { useState, useEffect } from "react";
import { rtdb } from "../firebase/fire";
import { ref, onValue, set, remove} from "firebase/database";
import {auth} from "../firebase/fire";
import Chat from "./Features/Chat";
import ReactModal from 'react-modal';
import ChatIcon from "@mui/icons-material/Chat";
import CancelIcon from '@mui/icons-material/Cancel';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

function WaitingRoom({roomId, setStarted, setJoined, playerId}) {
    const [players, setPlayers] = useState([]);
    const [isHost, setIsHost] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [chatOpen, setChatOpen] = useState(false)
    
    useEffect(() => {
        const gameRef = ref(rtdb, '/games/' + roomId);
        const uid = auth.currentUser.uid;
        onValue(gameRef, (snapshot) => {
            if(snapshot.exists()) {
                const data = snapshot.val();
                setIsHost(uid === data.host)
                setPlayers(data.playersId)
            } else{
                setJoined(false);
            }
        });

        const startRef = ref(rtdb, '/games/' + roomId + "/ready");
        onValue(startRef, (snapshot) => {
            var allReady = true;
            if(snapshot.exists()) {
                const ready = snapshot.val();
                for (let i = 0; i < ready.length; i++) {
                    if (!ready[i]){
                        allReady = false;
                    }
                }
                if (allReady) {
                    setStarted(true);
                }
            }
        });
    }, [roomId, setJoined, setStarted]);

    const setReady = () => {
        var gameRef = ref(rtdb, '/games/' + roomId);
        const uid = auth.currentUser.uid;
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            const players = data.players;
            for (let i = 0; i < players.length; i++) {
                if (uid === players[i]) {
                    set(ref(rtdb, '/games/' + roomId + "/ready/" + i), true)
                }
            }
        }, {onlyOnce: true});
        setIsReady(true);
    }

    const setNotReady = () => {
        const gameRef = ref(rtdb, '/games/' + roomId);
        const uid = auth.currentUser.uid;
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            const players = data.players;
            for (let i = 0; i < players.length; i++) {
                if (uid === players[i]) {
                    set(ref(rtdb, '/games/' + roomId + "/ready/" + i), false)
                }
            }
        }, {onlyOnce: true});
        setIsReady(false);
    }

    const setStart = () => {
        var gameRef = ref(rtdb, '/games/' + roomId);
        var allReady = true;
        var players;
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            players = data.players;
            const ready = data.ready;
            for (let i = 1; i < ready.length; i++) {
                if (!ready[i]) {
                    allReady = false;
                }
            }
        }, {onlyOnce:true});
        if (allReady) {
            setStarted(true);
        } else {
            if (players.length < 7) {
                alert(`Insufficient players: ${7 - players.length} more player needed`)
            } else {
                alert("Wait For All Players To Get Ready")
            }
        }
    }

    const leaveRoom = () => {
        const uid = auth.currentUser.uid;
        const gameRef = ref(rtdb, '/games/' + roomId);
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            var players = data.players;
            var playersId = data.playersId;
            const ready = data.ready;
            for (let i = 0; i < players.length; i++) {
                if (uid === players[i]) {
                    for (let j = i; j < players.length - 1; j++) {
                        set(ref(rtdb, '/games/' + roomId + "/ready/" + i), ready[i + 1]);
                        players[i] = players[i + 1];
                        playersId[i] = playersId[i + 1];
                    }
                }
            }
            set(ref(rtdb, '/games/' + roomId + "/ready/" + 6), false);
            players.pop();
            set(ref(rtdb, '/games/' + roomId + "/players"), players);
            playersId.pop();
            set(ref(rtdb, '/games/' + roomId + "/playersId"), playersId);
        }, {onlyOnce: true});
        setJoined(false)
    }

    const closeRoom = () => {
        const gameRef = ref(rtdb, '/games/' + roomId);
        remove(gameRef);
    }

    function openChat() {
        setChatOpen(true)
      }
    
      function closeChat() {
        setChatOpen(false)
      }

    return(
        <div>
            <h1>
                Room ID: {roomId}
            </h1>
            <h1 className="list">
                Player List:
                {players.map(player => (
                    <div>
                        {player}
                    </div>
                ))}
            </h1>
            <div className="btmButtons">
                <button className="chatRoomButton" onClick={openChat}>
                    Chat Room <ChatIcon className="icon" />
                </button>
                
                <ReactModal isOpen={chatOpen}>
                    <button onClick={closeChat}>Close</button>
                    <Chat
                    playerId={playerId}/>
                </ReactModal>
            {isHost ?(
                    <button className="hbtn hb-fill-right" onClick={setStart}>
                        Start Game <PlayCircleFilledIcon className="icon" />
                    </button>
             ):(
                isReady ?(
                <button className="notReady" onClick={setNotReady}>Not Ready</button>
             ):(
                                <button className="hbtn hb-fill-right" onClick={setReady}>
                                    Ready <PlayCircleFilledIcon className="icon" />
                                </button>
             )
            )}
            {isHost ?(
                    <button class="close" onClick={closeRoom}>
                        Close Room <CancelIcon className="icon"></CancelIcon>
                    </button>
                ):(
                <button class="close" onClick={leaveRoom}>Leave Room</button>
            )}
            </div>
        </div>
    );
}

export default WaitingRoom;