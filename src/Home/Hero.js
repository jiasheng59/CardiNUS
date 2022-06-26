import React, {useState} from 'react';
import Chat from "./Features/Chat"
import ChangePlayerId from "./Features/ChangePlayerId";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import ReactModal from 'react-modal';


function Hero({ handleLogout, playerId, setPlayerId, setJoined, setRoomId}){
  const [changeId, setChangeId] = useState(false)
  const [joiningRoom, setJoiningRoom] = useState(false)

  function change() {
    setChangeId(true)
  }

  function joining() {
    setJoiningRoom(true)
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
      <div>
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
      <div>
        <ReactModal isOpen={ false}>
          <Chat
          playerId={playerId} />
        </ReactModal>
      </div>
    </>
  );
};

export default Hero;
