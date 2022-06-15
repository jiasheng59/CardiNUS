import React, { useState } from 'react';
import { db, auth } from "./fire";
import firebase from "firebase/compat/app";
import "./Chat.css"

function SendMessage({playerId, scroll}) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            uid,
            playerId: playerId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('');
        scroll.current.scrollIntoView({behavior: "smooth"});
    }

    return (
        <div className="sendBox">
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                <input 
                    style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} 
                    placeholder='Type your messages here...' 
                    type="text" 
                    value={msg} 
                    onChange={e => setMsg(e.target.value)} 
                    />
                <input type="submit" value="send"/>
                </div>
            </form>
        </div>
    )
}

export default SendMessage;