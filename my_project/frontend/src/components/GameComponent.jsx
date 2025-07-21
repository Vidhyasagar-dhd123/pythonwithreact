
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useWebSocket } from '../contexts/WebSocketProvider';
import CreateRoom from './CreateRoom';

const RockPaperScissors = ({ onEmojiClick }) => {
    const emojis = [
        { label: "Rock", emoji: String.fromCodePoint(0x270A) },     // ✊
        { label: "Paper", emoji: String.fromCodePoint(0x270B) },    // ✋
        { label: "Scissors", emoji: String.fromCodePoint(0x270C) }, // ✌
    ];

    return (
        <div style={{ fontSize: "100px", display: "flex", gap: "1rem" }} className='border-rounded text-center align-items-center justify-content-center h-100'>
            {emojis.map(({ label, emoji }) => (
                <div
                    key={label}
                    title={label}
                    style={{ width: "150px", cursor: "pointer" }}
                    onClick={(event)=>onEmojiClick(event,label)}
                    className='rounded'>
                    {emoji}
                </div>
            ))}
        </div>
    );
};

const GameComponent = () => {
    const {socket, sendJson, ready} = useWebSocket();
    const [message, setMessage] = useState("");
    const [randomPlayer, setRandomPlayer] = useState(false)
    const [roomId,setRoomId] = useState(null)

   useEffect(() => {
    console.log("WebSocket connecting...", socket);
    if (!socket) return;

    socket.onopen = () => {
        console.log("WebSocket connected");
        sendJson({ message: "Hello server!" });
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Server:", data.message);
        setMessage(data.message);
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket closed");
    };

    return () => {
        socket.close();
    };
}, [socket]);
    
    const setConnectionType=(event)=>{
        if(event.target.checked){
            setRandomPlayer(true)
        }
        else{
            setRandomPlayer(false)
        }
    }

    const toggleClass = (event,label) => {
        sendJson({message:label})
        const el = event.target;
        if (el.classList.contains("opponent-win-shadow")) {
            el.classList.remove("opponent-win-shadow");
            el.classList.add("you-win-shadow");
        } else {
            el.classList.add("opponent-win-shadow");
            el.classList.remove("you-win-shadow");
        }
    };

    return (
        <div style={{ color: "red" }} className='container d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center m-4'>
                <h1>Rock Paper Scissors</h1>
                <p>Let's see who wins!</p>
                {message && <p className="text-success">Server: {message}</p>}
            </div>
            <div className='card w-100 flex-grow-1 m-5'>
                <div style={{ height: "500px" }} className='card-img-top bg-cover bg-center'>
                    <RockPaperScissors onEmojiClick={(event,label)=>toggleClass(event,label)} />
                </div>
                <div className='card-body d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='card-title'>Create Room</h5>
                    <input type="checkbox" id="randomCheck" onInput={setConnectionType} className="form-check-input me-2" />
                    <label htmlFor="randomCheck" className="form-check-label mb-0">Random</label>
                   <CreateRoom roomId={roomId} randomPlayer={randomPlayer}></CreateRoom>
                </div>
            </div>
        </div>
    );
};
export default GameComponent;