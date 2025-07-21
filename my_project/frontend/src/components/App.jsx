import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import GameComponent from './GameComponent';
import { WebSocketProvider } from '../contexts/WebSocketProvider';

// 📡 Initialize WebSocket outside component (or inside `useEffect`)
const App = () => {
    return (
        <GameComponent/>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <WebSocketProvider url="ws://localhost:8000/ws/game/">
        <App />
    </WebSocketProvider>

);
