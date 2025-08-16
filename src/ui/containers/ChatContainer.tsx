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

  // Load chat history
  useEffect(() => {
    if (!contact?.email) return;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/${contact.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m._id));
          const merged = [...prev];
          res.data.forEach((msg: Message) => {
            if (!existingIds.has(msg._id)) merged.push(msg);
          });
          return merged;
        });
        // Mark messages from this contact as read
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

  // WS message handler
  useEffect(() => {
    const ws = socketRef.current;
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.type === "receiveMessage") {
        const msg = data.message;
        if (msg.senderEmail === contact.email || msg.receiverEmail === contact.email) {
          setMessages((prev) => {
            const exists = prev.some((m) => m._id === msg._id);
            return exists ? prev : [...prev, msg];
          });
        }
      }

      if (data.type === "markAsRead") {
        const { chatId } = data;
        const thisChatId = [contact.email, user.email].sort().join("-");
        if (chatId === thisChatId) {
          setMessages((prev) =>
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

  // Send message with optimistic UI update
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const newMsg: Message = {
      _id: tempId,
      senderEmail: user.email,
      receiverEmail: contact.email,
      text,
      timestamp: new Date().toISOString(),
      status: "sent",
      sender: "",
      receiver: ""
    };

    setMessages((prev) => [...prev, newMsg]);

    sendWS({
      type: "sendMessage",
      senderEmail: user.email,
      receiverEmail: contact.email,
      text,
    });
  };

  return (
    <div className="h-screen flex flex-col flex-1 bg-[#f5f1ee]">
      <ChatBar contact={contact} onBack={onBack} />
      <div className="relative flex-1 overflow-y-auto p-4">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/assets/background.png')",
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        ></div>
        <div className="relative z-10 px-8">
          {messages.map((m, idx) => (
            <div
              key={m._id || idx}
              className={`flex mb-2 ${
                m.senderEmail === user.email ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-2 px-4 py-2 rounded-lg max-w-xs text-sm shadow-sm ${
                  m.senderEmail === user.email
                    ? "bg-lightgreen text-black"
                    : "bg-white text-black"
                }`}
              >
                <p>{m.text}</p>
                <span className=" text-xs text-gray-500 mt-1 ">
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  • {m.status}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <InputBox onSend={handleSendMessage}/>
    </div>
  );
}
