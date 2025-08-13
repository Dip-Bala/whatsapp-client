import { FiFolderPlus } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import IconButton from "../components/IconButtons";
import SearchBar from "./SearchBar";

export default function Header({ onShowContacts }: { onShowContacts: () => void }) {
  return (
    <div className="pt-2 w-full overflow-hidden bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center p-2 sm:gap-4">
        <h2 className="text-logogreen font-semibold text-xl">WhatsApp</h2>
        <div className="flex gap-4">
          {/* Add & preview contact button */}
          <IconButton
            onClick={onShowContacts}
            inactiveIcon={<FiFolderPlus className="text-black w-6 h-6" />}
          />
          <IconButton
            onClick={() => {}}
            inactiveIcon={<HiDotsVertical className="text-black w-6 h-6" />}
          />
        </div>
      </div>
      <SearchBar />
     <Groups />
    </div>
  );
}

function Groups() {
    return (
          <div className="flex gap-2 flex-wrap py-2">
                <button type="button" className="text-sm text-[#6a6a6a] py-1 px-2 cursor-pointer hover:bg-pampas border border-stone-300 rounded-2xl focus:bg-lightgreen">
                      All
                </button>
                <button type="button" className="text-sm text-[#6a6a6a] py-1 px-2 cursor-pointer hover:bg-pampas border border-stone-300 rounded-2xl focus:bg-lightgreen">
                      Unread
                </button>
                <button type="button" className="text-sm text-[#6a6a6a] py-1 px-2 cursor-pointer hover:bg-pampas border border-stone-300 rounded-2xl focus:bg-lightgreen">
                      Favorite
                </button>
                <button type="button" className="text-sm text-[#6a6a6a] py-1 px-2 cursor-pointer hover:bg-pampas border border-stone-300 rounded-2xl focus:bg-lightgreen">
                      Groups
                </button>
          </div>
    )
}
