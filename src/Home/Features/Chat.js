import React, {useState, useEffect, useRef} from 'react';
import SendMessage from './SendMessage'
import { db } from "../../firebase/fire";
import "./Chat.css"


function Chat({playerId}) {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    
    return (
        <>
        <div className="messages">
            {messages.map(({id, text, playerId}) => (
                <div key={id}>
                    <p>{`${playerId} : ${text}`}</p>
                </div>   
            ))}
            </div>
            <SendMessage
                playerId={playerId}
                scroll={scroll}
                />
            <div ref={scroll}></div>
            </>
    )
    

}

export default Chat;