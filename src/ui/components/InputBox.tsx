import { RiEmojiStickerLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import IconButton from "./IconButtons";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export default function InputBox({
  contactId,
  onSend,
}: {
  contactId: string;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const token = localStorage.getItem("authorization");

  async function sendMessage() {
    if (!text.trim()) return;

    // API call
    await axios.post(
      `${API_URL}/messages`,
      { receiverId: contactId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update UI instantly
    onSend(text);

    setText("");
  }

  return (
    <div className="bg-white rounded-4xl px-4 py-2 flex items-center justify-between m-4">
      <IconButton
        onClick={() => {}}
        inactiveIcon={<HiPlus className="text-black w-6 h-6" />}
      />
      <IconButton
        onClick={() => {}}
        inactiveIcon={<RiEmojiStickerLine className="text-black w-6 h-6" />}
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="w-full focus:outline-0"
      />
      <IconButton
        onClick={sendMessage}
        inactiveIcon={<IoSend className="text-green-500 w-6 h-6" />}
      />
    </div>
  );
}
