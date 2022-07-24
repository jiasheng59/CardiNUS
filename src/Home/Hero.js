import React, { useState, useEffect } from 'react';
import { rtdb, auth } from "../firebase/fire";
import { onValue, ref, set } from "firebase/database";
import Chat from "./Features/Chat";
import Achievements from './Features/Achievements';
import ChangePlayerId from "./Features/ChangePlayerId";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import ReactModal from 'react-modal';
import OutboxIcon from '@mui/icons-material/Outbox';
import ChatIcon from "@mui/icons-material/Chat";

function Hero({ handleLogout, playerId, setPlayerId, setJoined, setRoomId }) {
  const [changeId, setChangeId] = useState(false)
  const [joiningRoom, setJoiningRoom] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  function change() {
    setChangeId(true)
  }

  function joining() {
    setJoiningRoom(true)
  }

  function openChat() {
    setChatOpen(true)
  }

  function closeChat() {
    setChatOpen(false)
  }

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = ref(rtdb, '/profiles/' + uid + "/playerID/");

    onValue(userRef, (snapshot) => {
      if(!snapshot.exists()) {
        set(userRef, "Anon");
      }
      setPlayerId(snapshot.val())
    });
  })

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const statRef = ref(rtdb, '/profiles/' + uid + "/statistics/");
    onValue(statRef, (snapshot) => {
      if(!snapshot.exists()) {
        set(statRef, {TotalGames: 0, WinAsAlien: 0, WinAsCrew:0});
      }
    });
  })

  return (
    <>
      <section className="hero">
        <nav>
          {changeId ? (
            <ChangePlayerId
              setChangeId={setChangeId}
              setPlayerId={setPlayerId} />
          ) : (
            <>
              <h2>{playerId}</h2>
              <button onClick={change}>Change Id</button>
            </>
          )
          }
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <Achievements/>
      </section>
      <div className="btmButtons">
        <button className="chatRoomButton" onClick={openChat}>Chat Room <ChatIcon className="icon" /></button>
        <ReactModal isOpen={chatOpen}>
          <button onClick={closeChat}>Close</button>
          <Chat
            playerId={playerId} />
        </ReactModal>
        <CreateRoom
          setRoomId={setRoomId}
          setJoined={setJoined}
          playerId={playerId}
        />
        {joiningRoom ? (
          <JoinRoom
            setRoomId={setRoomId}
            setJoined={setJoined}
            playerId={playerId}
          />
        ) : (
          <button className="chatRoomButton" onClick={joining}>Join Room <OutboxIcon className="icon" /></button>
        )}
      </div>
    </>
  );
};

export default Hero;
