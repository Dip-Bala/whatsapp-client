import { useState } from "react";
import ChatPreview from "../components/ChatPreview";
import Header from "../components/Header";

interface SidebarProps {
  onAddContact: () => void; // Go to contacts view
  onOpenChat: (contact: any) => void; // Open a specific chat
}

export default function Sidebar({ onAddContact, onOpenChat }: SidebarProps) {

  const chats = [
    { id: 1, name: "Alice", lastMessage: "Hey there!" },
    { id: 2, name: "Bob", lastMessage: "What’s up?" }
  ];

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white">
       <Header onShowContacts={onAddContact} />

      <div className="flex flex-col gap-4 pt-2">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onOpenChat(chat)}
            className="cursor-pointer hover:bg-gray-100 rounded"
          >
            <ChatPreview name={chat.name} lastMessage={chat.lastMessage} />
          </div>
        ))}
      </div>
    </div>
  );
}




