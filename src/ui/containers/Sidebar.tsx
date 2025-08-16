import { useEffect } from "react";
import ChatPreview from "../components/ChatPreview";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "../../config";
import { useWS } from "../../ws";
import { useRecoilState } from "recoil";
import { chatsAtom } from "../../hooks/atom";

interface SidebarProps {
  onAddContact: () => void;
  onOpenChat: (chat: any) => void;
}

export default function Sidebar({ onAddContact, onOpenChat }: SidebarProps) {
  const { socketRef } = useWS();
  const [chats, setChats] = useRecoilState(chatsAtom);

  const token = localStorage.getItem("authorization");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function fetchChats(){
      try{
        const res = await axios.get(`${API_URL}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setChats(res.data);
      }catch(e){
        console.log("Failed to load chats");
      }
    }

  useEffect(() => {
    fetchChats()
  }, []);

  // WS listeners
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
        const isMine = msg.senderEmail === user.email;
        const participantEmail = isMine ? msg.receiverEmail : msg.senderEmail;
        const participantName = isMine ? msg.receiverName : msg.senderName;
        const participantPic = isMine ? msg.receiverProfilePicUrl : msg.senderProfilePicUrl;

        setChats((prev: any[]) => {
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
  }, [socketRef, user.email, fetchChats, setChats]);

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white z-10">
      <Header onShowContacts={onAddContact} />
      <div className="flex flex-col gap-1 pt-2">
        {chats.map((chat) => (
          <div
            key={chat.chatId || chat.participant.email}
            onClick={() => onOpenChat({
              email: chat.participant.email,
              name: chat.participant.name,
              profilePicUrl: chat.participant.profilePicUrl
            })}
            className="cursor-pointer hover:bg-brownishgray rounded-xl transition-colors p-1"
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
