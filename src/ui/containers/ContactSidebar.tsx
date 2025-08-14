import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { API_URL } from "../../config";
import IconButton from "../components/IconButtons";

interface Contact {
  _id: string;
  name: string;
  email: string;
  isOnWhatsApp?: boolean;
}

export default function ContactsSidebar({ onBack, onSelectContact }: { onBack: () => void, onSelectContact: (c: Contact) => void }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(0);
  const token = localStorage.getItem("authorization");

  // Fetch contacts from DB
  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await axios.get(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(res.data);
        console.log(contacts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, [token, refreshFlag]);

  // Save contact to DB
  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    console.log(newName)
    try {
      const res = await axios.post(
        `${API_URL}/contact`,
        { name: newName, email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts(prev => [...prev, res.data]); // Update local state
      setNewName("");
      setNewEmail("");
      setShowForm(false);
      setRefreshFlag(prev => prev + 1); 
    } catch (err) {
      console.error(err);
    }
  }

  const filteredContacts = contacts
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white">
      {/* Header */}
      <div className="flex justify-between p-2">
        <IconButton
          onClick={onBack}
          inactiveIcon={<FaArrowLeftLong className="" />}
        />
        <p className="font-medium text-md">New Chat</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-pampas rounded-4xl pl-4 py-2 placeholder:text-sm placeholder:text-mediumdarkgray focus:outline-logogreen flex-1"
        />

        {/* <IconButton
          onClick={onBack}
          className="bg-green-600"
          activeIcon={<FaUserPlus className="text-white " />}
        /> */}
        <button
          onClick={() => setShowForm(true)}
          className=" cursor-pointer bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
        >
          <FaUserPlus />
        </button>
      </div>

      {/* Add contact form */}
      {showForm && (
        <form onSubmit={handleAddContact} className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Contact
          </button>
        </form>
      )}

      {/* Contacts list */}
      <div className="space-y-2">
        {filteredContacts.map(contact => (
          <div
            key={contact._id}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectContact(contact)}
          >
            <p className="font-medium">{contact.name}</p>
            <p className="text-sm text-gray-500">
              {contact.isOnWhatsApp ? "On WhatsApp" : "They are not on WhatsApp"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
