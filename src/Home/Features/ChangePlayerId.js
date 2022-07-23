import React, {useState} from 'react';
import { rtdb, auth } from "../../firebase/fire";
import { ref, set } from "firebase/database";

function ChangePlayerId({setPlayerId, setChangeId}){
    const [id, setId] = useState('')

    function changePlayerId() {
      const uid = auth.currentUser.uid;
      const userRef = ref(rtdb, '/profiles/' + uid + "/playerID/");
      set(userRef, id);
      setPlayerId(id)
      setChangeId(false);
    }

    return (
      <div>
        <form onSubmit={changePlayerId}>
            <input
                type="text" 
                value={id} 
                onChange={e => setId(e.target.value)}
            />
            <input type="submit" value="change"/>
        </form>
      </div>
    )
  }

  export default ChangePlayerId;