import { useEffect, useState, useRef } from "react";
import ChatBar from "../components/ChatBar";
import InputBox from "../components/InputBox";
import { useWS } from "../../ws";

interface ChatContainerProps {
  contact: any;
  onBack: () => void;
}

interface Message {
  _id?: string;
  sender: string;
  receiver: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export default function ChatContainer({ contact, onBack }: ChatContainerProps) {
  const { sendWS, socketRef } = useWS();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // WS listener for incoming messages
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "receiveMessage") {
        if (
          data.message.sender === contact._id ||
          data.message.receiver === contact._id
        ) {
          setMessages((prev) => [...prev, data.message]);
        }
      }
    };

    // Mark as read
    sendWS({
      type: "markAsRead",
      senderId: contact._id,
      receiverId: user._id,
    });
  }, [contact, socketRef, sendWS, user._id]);

  // Handle sending message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      sender: user._id,
      receiver: contact._id,
      text,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);

    sendWS({
      type: "sendMessage",
      senderId: user._id,
      receiverId: contact._id,
      text,
    });
  };

  return (
    <div className="h-screen flex flex-col flex-1 bg-[#f5f1ee]">
      <ChatBar contact={contact} onBack={onBack} />

      {/* Messages with background */}
      <div className="relative flex-1 overflow-y-auto p-4">
        {/* Background image layer */}
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

        {/* Message list */}
        <div className="relative z-10">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${
                m.sender === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  m.sender === user._id
                    ? "bg-green-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box */}
      <InputBox contactId={contact._id} onSend={handleSendMessage} />
    </div>
  );
}
