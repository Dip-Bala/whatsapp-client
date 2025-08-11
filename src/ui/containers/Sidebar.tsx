import ChatPreview from "../components/ChatPreview";
import SearchBar from "../components/SearchBar";
import { NewChatIcon, OptionsIcon } from "../icons/NavbarIcons";

export default function Sidebar(){
    return (
          <div className="border-r border-black/20 h-screen w-xs md:w-sm lg:w-md ml-16 p-4 ">
            {/* figure how to make it fixed without tampering the current ui  */}
            <div className=""> 
            <div className="flex justify-between items-center p-2 sm:gap-4">
                  <h2 className="text-logogreen font-semibold text-xl">
                        WhatsApp
                  </h2>
                  <div className="flex gap-4">
                        <NewChatIcon />
                        <OptionsIcon />
                  </div>
            </div>
            <SearchBar />
            <Groups />
            </div>

            <div className="flex flex-col overflow-y-hidden  gap-4 pt-2">
             <ChatPreview />
             <ChatPreview /> 
             <ChatPreview /> 
             <ChatPreview /> 
             <ChatPreview />
             <ChatPreview />
             <ChatPreview /> 
             <ChatPreview /> 
             <ChatPreview /> 
             <ChatPreview />
            </div>
          </div>
    )
}

function Groups(){
      return(
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