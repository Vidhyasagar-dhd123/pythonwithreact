import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

// 📡 Initialize WebSocket outside component (or inside `useEffect`)
const socket = new WebSocket('wss://localhost:8000/ws/game/');

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
                    onClick={onEmojiClick}
                    className='rounded'>
                    {emoji}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("WebSocket connecting...");

        socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send(JSON.stringify({ message: "Hello server!" }));
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
    }, []);

    const toggleClass = (event) => {
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
                    <RockPaperScissors onEmojiClick={toggleClass} />
                </div>
                <div className='card-body d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='card-title'>Create Room</h5>
                    <input type="text" className='form-control mb-3' placeholder='Enter room name' />
                    <a href="#" className='btn btn-primary'>Join Room</a>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
