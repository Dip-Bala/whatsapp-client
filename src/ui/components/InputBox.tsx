// src/ui/components/InputBox.tsx
import { RiEmojiStickerLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import IconButton from "./IconButtons";
import { useState } from "react";

export default function InputBox({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="bg-white rounded-4xl px-4 py-2 flex items-center justify-between m-4">
      <IconButton onClick={() => {}} inactiveIcon={<HiPlus className="text-black w-6 h-6" />} />
      <IconButton onClick={() => {}} inactiveIcon={<RiEmojiStickerLine className="text-black w-6 h-6" />} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="w-full focus:outline-0"
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />
      <IconButton onClick={send} inactiveIcon={<IoSend className="text-green-500 w-6 h-6" />} />
    </div>
  );
}
