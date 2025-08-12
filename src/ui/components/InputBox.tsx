
import { LuMic } from "react-icons/lu";
import { RiEmojiStickerLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import IconButton from "./IconButtons";

export default function InputBox() {
    return (
        <div className="bg-white rounded-4xl px-4 py-2 flex items-center justify-between m-4">
            <IconButton
                onClick={() => { }}
                inactiveIcon={<HiPlus className="text-black w-6 h-6" />}
            />
            <IconButton
                onClick={() => { }}
                inactiveIcon={<RiEmojiStickerLine className="text-black w-6 h-6" />}
            />
            <input placeholder="Type a message" className="w-full focus:outline-0" />
            <IconButton
                onClick={() => { }}
                inactiveIcon={<LuMic className="text-black w-6 h-6" />}
            />
        </div>
    )
}

