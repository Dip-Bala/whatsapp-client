// src/context/WSContext.tsx
import { createContext, useRef, useEffect, useState, useContext } from "react";

const WS_URL = import.meta.env.VITE_WS_BACKEND_URL;

interface WSContextType {
  socketRef: React.MutableRefObject<WebSocket | null>;
  sendWS: (data: any) => void;
}

const WSContext = createContext<WSContextType | undefined>(undefined);

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!user) return;

    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS Connected");
      ws.send(JSON.stringify({ type: "join", userId: user._id }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WS Received:", data);

      switch (data.type) {
        case "receiveMessage":
          // TODO: Update chat store
          break;
        case "userOnline":
          // TODO: update contact status
          break;
        case "userOffline":
          // TODO: update contact status
          break;
      }
    };

    ws.onclose = () => console.log("❌ WS Disconnected");
    ws.onerror = (err) => console.error("⚠️ WS Error:", err);

    return () => {
      if (ws.readyState <= 1) ws.close();
    };
  }, [user]);

  const sendWS = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return (
    <WSContext.Provider value={{ socketRef, sendWS }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => {
  const ctx = useContext(WSContext);
  if (!ctx) throw new Error("useWS must be used inside WSProvider");
  return ctx;
};
