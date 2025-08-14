// src/ui/containers/ChatContainer.tsx
import { useEffect, useRef } from "react";
import axios from "axios";
import ChatBar from "../components/ChatBar";
import InputBox from "../components/InputBox";
import { useWS } from "../../ws";
import { useRecoilState } from "recoil";
import { API_URL } from "../../config";
import { messagesAtom, type Message } from "../../hooks/atom";

interface ChatContainerProps {
  contact: { email: string; name?: string; profilePicUrl?: string; isOnline?: boolean };
  onBack: () => void;
}

interface WSMessage {
  _id?: string;
  senderEmail: string;
  receiverEmail: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export default function ChatContainer({ contact, onBack }: ChatContainerProps) {
  const { sendWS, socketRef } = useWS();
  const [messages, setMessages] = useRecoilState(messagesAtom(contact.email));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("authorization");

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load history on chat open
  useEffect(() => {
    if (!contact?.email) return;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/${contact.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        // Mark as read for delivered messages from this contact
        sendWS({
          type: "markAsRead",
          senderEmail: contact.email,
          receiverEmail: user.email,
        });
      } catch (e) {
        console.error("Failed to load conversation", e);
      }
    })();
  }, [contact.email, sendWS, setMessages, token, user.email]);

  // WS listener to append messages + markAsRead result
  useEffect(() => {
    const ws = socketRef.current;
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "receiveMessage") {
        const msg: WSMessage = data.message;
        // Only add if for this chat
        if (msg.senderEmail === contact.email || msg.receiverEmail === contact.email) {
          const mapped: Message = {
            _id: msg._id,
            sender: "",
            receiver: "",
            senderEmail: msg.senderEmail,
            receiverEmail: msg.receiverEmail,
            text: msg.text,
            timestamp: msg.timestamp,
            status: msg.status,
          };
          setMessages((prev: any) => [...prev, mapped]);
        }
      }

      if (data.type === "markAsRead") {
        const { chatId } = data;
        const thisChatId = [contact.email, user.email].sort().join("-");
        if (chatId === thisChatId) {
          setMessages((prev: any[]) =>
            prev.map((m) =>
              m.status === "delivered" ? { ...m, status: "read" } : m
            )
          );
        }
      }
    };

    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [contact.email, setMessages, socketRef, user.email]);

  // Send a message via WS (no duplicate HTTP save)
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    sendWS({
      type: "sendMessage",
      senderEmail: user.email,
      receiverEmail: contact.email,
      text,
    });
    // No optimistic append to avoid duplicates; server echoes back immediately
  };

  return (
    <div className="h-screen flex flex-col flex-1 bg-[#f5f1ee]">
      <ChatBar contact={contact} onBack={onBack} />

      <div className="relative flex-1 overflow-y-auto p-4">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/assets/background.png')",
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        ></div>

        <div className="relative z-10">
          {messages.map((m, idx) => (
            <div
              key={m._id || idx}
              className={`flex mb-2 ${m.senderEmail === user.email ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  m.senderEmail === user.email ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                <p>{m.text}</p>
                <span className="block text-xs text-gray-500 mt-1">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {m.status}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <InputBox onSend={handleSendMessage} />
    </div>
  );
}
