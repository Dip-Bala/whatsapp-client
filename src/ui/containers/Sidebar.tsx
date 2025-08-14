// src/ui/containers/Sidebar.tsx
import { useEffect, useState } from "react";
import ChatPreview from "../components/ChatPreview";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "../../config";
import { useWS } from "../../ws";

interface SidebarProps {
  onAddContact: () => void;
  onOpenChat: (chat: any) => void;
}

export default function Sidebar({ onAddContact, onOpenChat }: SidebarProps) {
  const { socketRef } = useWS();
  const [chats, setChats] = useState<any[]>([]);

  const token = localStorage.getItem("authorization");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${API_URL}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(res.data);
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // WS listener: receiveMessage / refreshChats
  useEffect(() => {
    const ws = socketRef.current;
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "receiveMessage") {
        const msg = data.message as {
          senderEmail: string;
          receiverEmail: string;
          text: string;
          timestamp: string;
          status: string;
          senderName?: string;
          receiverName?: string;
          senderProfilePicUrl?: string;
          receiverProfilePicUrl?: string;
        };

        const isMine = msg.senderEmail === user.email;
        const participantEmail = isMine ? msg.receiverEmail : msg.senderEmail;
        const participantName = isMine ? msg.receiverName : msg.senderName;
        const participantPic = isMine ? msg.receiverProfilePicUrl : msg.senderProfilePicUrl;

        setChats((prev) => {
          const filtered = prev.filter((c) => c.participant.email !== participantEmail);
          return [
            {
              chatId: [msg.senderEmail, msg.receiverEmail].sort().join("-"),
              participant: {
                email: participantEmail,
                name: participantName || participantEmail,
                profilePicUrl: participantPic || "",
              },
              lastMessage: {
                text: msg.text,
                timestamp: msg.timestamp,
                status: msg.status,
              },
              unreadCount: isMine ? 0 : 1,
            },
            ...filtered,
          ];
        });
      }

      if (data.type === "refreshChats") {
        fetchChats();
      }

      if (data.type === "markAsRead") {
        const { chatId } = data;
        setChats((prev) =>
          prev.map((c) => (c.chatId === chatId ? { ...c, unreadCount: 0 } : c))
        );
      }
    };

    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [socketRef, user.email]);

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white">
      <Header onShowContacts={onAddContact} />

      <div className="flex flex-col gap-1 pt-2">
        {chats.map((chat) => (
          <div
            key={chat.chatId || chat.participant.email}
            onClick={() => onOpenChat(chat.participant)}
            className="cursor-pointer hover:bg-gray-100 rounded transition-colors"
          >
            <ChatPreview
              name={chat.participant.name || chat.participant.email}
              lastMessage={chat.lastMessage?.text || ""}
              timestamp={chat.lastMessage?.timestamp}
              unreadCount={chat.unreadCount}
              profilePicUrl={chat.participant.profilePicUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
