// contexts/WebSocketProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ url, children }) => {
    const [socket, setSocket] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);
        setSocket(ws); // This triggers re-render with non-null socket

        ws.onopen = () => {
            console.log("WebSocket connected in provider");
            setReady(true);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setReady(false);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error in provider:", err);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    const sendJson = (data) => {
            socket.send(JSON.stringify(data));
            console.warn("WebSocket not ready or not open");
    };

    const contextValue = { socket, sendJson, ready };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
