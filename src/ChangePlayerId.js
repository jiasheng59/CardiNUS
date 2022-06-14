import React, {useState} from 'react';

function ChangePlayerId({setPlayerId, setChangeId}){
    const [id, setId] = useState('')

    function changePlayerId() {
        setPlayerId(id);
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