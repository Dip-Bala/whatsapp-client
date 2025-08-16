import { IoMdSearch } from "react-icons/io";
import { LuVideo } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import IconButton from "./IconButtons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

export default function ChatBar({
  contact,
  onBack,
}: {
  contact: { email: string; name?: string; profilePicUrl?: string; isOnline?: boolean };
  onBack: () => void;
}) {
  return (
    <div className="flex justify-between items-center px-4 py-3  shadow-b shadow-md w-full bg-white z-10">
      <div className="flex items-center gap-2 md:gap-0">
        <IconButton onClick={onBack} inactiveIcon={<FaArrowLeftLong className="w-4 h-4 md:hidden "/>} />
        <div className="flex items-center gap-2 ">
        {contact.profilePicUrl ? (
          <img
            src={contact.profilePicUrl}
            alt={contact.name || contact.email}
            className="rounded-full w-10 h-10 object-cover"
          />
        ) : (
          <FaRegUserCircle className="rounded-full w-10 h-10 text-gray-400" />
        )}

        <div className="flex flex-col">
          <p className="font-medium">{contact.name || contact.email}</p>
          {/* <span className="text-xs text-gray-500">
            {contact.isOnline ? "Online" : "Offline"}
          </span> */}
        </div>
      </div>
      </div>

      <div className="flex items-center gap-4">
        <IconButton onClick={() => {}} inactiveIcon={<LuVideo className="text-black w-6 h-6" />} />
        <IconButton onClick={() => {}} inactiveIcon={<IoMdSearch className="text-black w-6 h-6" />} />
        <IconButton onClick={() => {}} inactiveIcon={<HiDotsVertical className="text-black w-6 h-6" />} />
      </div>
    </div>
  );
}
