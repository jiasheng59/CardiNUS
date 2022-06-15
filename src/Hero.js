import React, {useState} from 'react';
import Chat from "./Chat"
import ChangePlayerId from "./ChangePlayerId";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';


function Hero({ handleLogout, playerId, setPlayerId, setJoined, setRoomId}){
  const [changeId, setChangeId] = useState(false)

  function change() {
    setChangeId(true)
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
        />
        <JoinRoom
          setRoomId={setRoomId}
          setJoined={setJoined}
        />
        </div>
      <div>
        <Chat
          playerId={playerId}/>
      </div>
    </>
  );
};

export default Hero;
