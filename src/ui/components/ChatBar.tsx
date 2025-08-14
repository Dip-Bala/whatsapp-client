import { IoMdSearch } from "react-icons/io";
import { LuVideo } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import IconButton from "./IconButtons";
import { FaRegUserCircle } from "react-icons/fa";

export default function ChatBar({
      contact,
      onBack,
}: {
      contact: any;
      onBack: () => void;
}) {
      return (
            <div className="flex justify-between items-center px-4 py-2 shadow-b shadow-md w-full bg-white">
                  {/* Left section */}
                  <div className="flex items-center gap-2">
                        {/* Back Arrow (mobile only) */}
                        <IconButton
                              onClick={onBack}
                              inactiveIcon={<FaArrowLeftLong className="" />}
                        />

                        {/* Profile Image & Name */}
                        {/* <img
                              src={contact.profilePicUrl}
                              alt={contact.name}
                              className="rounded-full w-10 h-10 object-cover"
                        /> */}
                        <FaRegUserCircle className="rounded-full w-8 h-8 text-mediumdarkgray "/>
                        <div className="flex flex-col">
                              <p className="font-medium">{contact.name}</p>
                              <span className="text-xs text-gray-500">
                                    {contact.isOnWhatsApp ? "Online" : "Not on WhatsApp"}
                              </span>
                        </div>
                  </div>

                  {/* Right section */}
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
      );
}
