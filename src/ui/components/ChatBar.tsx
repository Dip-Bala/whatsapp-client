import { IoMdSearch } from "react-icons/io";
import { LuVideo } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import IconButton from "./IconButtons";


export default function ChatBar() {
      return (
            <div className="flex justify-between items-center px-4 py-2 shadow-b shadow-md w-full bg-white">
                  <div className="flex p-2 items-center gap-2">
                        {/* get receiver profile */}
                        <img src="/assets/profile.jpeg" className="rounded-full w-10 h-10" />
                        <p>Chutku</p>
                  </div>
                  <div className="flex items-center gap-4">
                        <IconButton
                              onClick={() => { }}
                              inactiveIcon={<LuVideo className="text-black w-6 h-6" />}
                        />
                        <IconButton
                              onClick={() => { }}
                              inactiveIcon={<IoMdSearch className="text-black w-6 h-6" />}
                        />
                        <IconButton
                              onClick={() => { }}
                              inactiveIcon={<HiDotsVertical className="text-black w-6 h-6" />}
                        />
                  </div>
            </div>
      )
}

