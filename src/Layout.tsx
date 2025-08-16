
import { useState } from "react";
import ChatContainer from "./ui/containers/ChatContainer";
import Sidebar from "./ui/containers/Sidebar";
import Navbar from "./ui/containers/Navbar";
import ContactsSidebar from "./ui/containers/ContactSidebar";

export default function Layout() {
  const [view, setView] = useState<"chats" | "contacts">("chats");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [mobileView, setMobileView] = useState<"sidebar" | "chat">("sidebar");

  function openChat(contact: any) {
    setSelectedContact(contact);
    if (window.innerWidth < 768) {
      setMobileView("chat");
    }
  }

  function goBackToSidebar() {
    setMobileView("sidebar");
    setSelectedContact(null);
  }

  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-1">
        {view === "chats" && (
          <Sidebar
            onAddContact={() => setView("contacts")}
            onOpenChat={openChat}
          />
        )}
        {view === "contacts" && (
          <ContactsSidebar
            onBack={() => setView("chats")}
            onSelectContact={(contact: any) => {
              openChat(contact);
              setView("chats");
            }}
          />
        )}

        <div className="flex-1">
          {selectedContact ? (
            <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-1">
        {mobileView === "sidebar" && (
          <>
            {view === "chats" && (
              <Sidebar
                onAddContact={() => setView("contacts")}
                onOpenChat={openChat}
              />
            )}
            {view === "contacts" && (
              <ContactsSidebar
                onBack={() => setView("chats")}
                onSelectContact={(contact: any) => {
                  openChat(contact);
                  setView("chats");
                }}
              />
            )}
          </>
        )}

        {mobileView === "chat" && selectedContact && (
          <ChatContainer contact={selectedContact} onBack={goBackToSidebar} />
        )}
      </div>
    </div>
  );
}
