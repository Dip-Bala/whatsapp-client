
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import axios from "axios";
import { API_URL } from "../../config";
import IconButton from "../components/IconButtons";
import { IoMailSharp } from "react-icons/io5";
import { contactsAtom } from "../../hooks/atom";
import { useRecoilState } from "recoil";

export interface Contact {
  _id: string;
  owner: string;
  name: string;
  email: string;
  profilePicUrl: string | null;
  isOnline: boolean;
  linkedUser: string | null;
  isOnWhatsApp: boolean;
  createdAt: string;
  updatedAt: string;
}


export default function ContactsSidebar({
  onBack,
  onSelectContact,
}: {
  onBack: () => void;
  onSelectContact: (c: Contact) => void;
}) {
  const [contacts, setContacts] = useRecoilState(contactsAtom);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(0);
  const token = localStorage.getItem("authorization");

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await axios.get(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(res.data);
        console.log(contacts); //for contact test
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, [token, refreshFlag]);

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/contact`,
        { name: newName, email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts((prev) => [...prev, res.data]);
      setNewName("");
      setNewEmail("");
      setShowForm(false);
      setRefreshFlag((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredContacts = contacts
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll bg-white z-10">
      <div className="flex justify-between p-2">
        <IconButton onClick={onBack} inactiveIcon={<FaArrowLeftLong className="" />} />
        <p className="font-medium text-md">New Chat</p>
      </div>

      <div className="flex flex-col gap-6 mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-pampas rounded-4xl pl-4 py-2 placeholder:text-sm placeholder:text-mediumdarkgray focus:outline-logogreen flex-1"
        />
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-4 cursor-pointer hover:bg-pampas rounded-4xl p-2"
        >
          <span className="bg-green-600 text-white rounded-full"><FaUserPlus className="w-10 h-10 p-2" /></span>
          <span className="text-black text-md">New Contact</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddContact} className="flex flex-col gap-4 mb-4 space-y-2">
          <div className="flex gap-4 items-center ">
            <div><FaUser className="w-4 h-4 text-mediumdarkgray" /></div>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="w-full border-b-2 border-mediumdarkgray/60 py-1 focus:outline-none"
            />
          </div>

          <div className="flex gap-4 items-center ">
            <div><IoMailSharp className="w-4 h-4 text-mediumdarkgray" /></div>
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full border-b-2 border-mediumdarkgray/60 py-1 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer border border-green-600 rounded-lg text-mediumdarkgray px-4 py-2  hover:bg-green-600 hover:text-white"
          >
            Save Contact
          </button>
        </form>
      )}

      <div className="space-y-2">
        {filteredContacts.map((contact) => (
          <div
            key={contact._id}
            className="p-2 hover:bg-brownishgray cursor-pointer rounded-xl"
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
