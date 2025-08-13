import { useState } from "react";
import ChatPreview from "../components/ChatPreview";
import Header from "../components/Header";
import ContactsSidebar from "./Contacts";

export default function Sidebar() {
  const [showContacts, setShowContacts] = useState(false);

  if (showContacts) {
    return <ContactsSidebar onBack={() => setShowContacts(false)} />;
  }

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white">
      <Header onShowContacts={() => setShowContacts(true)} />
      <div className="flex flex-col gap-4 pt-2">
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
      </div>
    </div>
  );
}




