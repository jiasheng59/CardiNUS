import React, {useState} from 'react';
import Chat from "./Features/Chat"
import ChangePlayerId from "./Features/ChangePlayerId";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import ReactModal from 'react-modal';


function Hero({ handleLogout, playerId, setPlayerId, setJoined, setRoomId}){
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

  return (
    <>
      <section className="hero">
        <nav>
          {changeId ? (
            <ChangePlayerId
              setChangeId={setChangeId}
              setPlayerId={setPlayerId}/>
          ):(
            <>
              <h2>{playerId}</h2>
              <button onClick={change}>Change Id</button>
            </>
            )
          }
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </section>
      <div className="btmButtons">
        <button onClick={openChat}>Chat Room</button>
          <ReactModal isOpen={chatOpen}>
            <button onClick={closeChat}>Close</button>
            <Chat
            playerId={playerId}/>
          </ReactModal>
        <CreateRoom
          setRoomId={setRoomId}
          setJoined={setJoined}
          playerId={playerId}
        />
        {joiningRoom ?(
          <JoinRoom
            setRoomId={setRoomId}
            setJoined={setJoined}
            playerId={playerId}
          />
          ):(
            <button onClick={joining}>Join Room</button>
          )}
      </div>
    </>
  );
};

export default Hero;
