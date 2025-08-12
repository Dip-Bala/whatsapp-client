import ChatPreview from "../components/ChatPreview";
import SearchBar from "../components/SearchBar";
import { HiDotsVertical } from "react-icons/hi";
import { FiFolderPlus } from "react-icons/fi";
import IconButton from "../components/IconButtons";

export default function Sidebar() {
      return (
            <div className="md:border-r border-black/20 h-screen w-full md:w-sm lg:w-md md:ml-16 p-4 overflow-y-scroll">
                  <Header />
                  <div className="flex flex-col gap-4 pt-2">

                        {/* map chats here */}
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

function Header(){
      return(
            <div className="pt-2 w-full w-inherit overflow-hidden bg-white">
                        <div className="flex justify-between items-center p-2 sm:gap-4">
                              <h2 className="text-logogreen font-semibold text-xl">
                                    WhatsApp
                              </h2>
                              <div className="flex gap-4">
                                    <IconButton
                                          onClick={() => { }}
                                          inactiveIcon={<FiFolderPlus className="text-black w-6 h-6" />}
                                    />
                                    <IconButton
                                          onClick={() => { }}
                                          inactiveIcon={<HiDotsVertical className="text-black w-6 h-6" />}
                                    />
                              </div>
                        </div>
                        <SearchBar />
                        <Groups />
                  </div>
      )
}