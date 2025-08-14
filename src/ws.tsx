import React, {
  createContext,
  useRef,
  useEffect,
  useContext,
  type RefObject,
} from "react";
import { WS_URL } from "./config";

interface WSContextType {
  sendWS: (data: any) => void;
  socketRef: RefObject<WebSocket | null>;
}

const WSContext = createContext<WSContextType | undefined>(undefined);

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser || "{}");
    if (!user?.email) return;

    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS Connected");
      ws.send(JSON.stringify({ type: "join", email: user.email }));
    };

    ws.onclose = () => console.log("❌ WS Disconnected");
    ws.onerror = (err) => console.error("⚠️ WS Error:", err);

    return () => {
      try {
        if (ws.readyState <= 1) ws.close();
      } catch {}
      socketRef.current = null;
    };
  }, []);

  const sendWS = (data: any) => {
    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      console.warn("WS not open; skipping send", data);
    }
  };

  return (
    <WSContext.Provider value={{ sendWS, socketRef }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => {
  const context = useContext(WSContext);
  if (!context) throw new Error("useWS must be used inside WSProvider");
  return context;
};
