import { OptionsIcon, SearchIcon2, VideoIcon } from "../icons/NavbarIcons";

export default function ChatBar(){
    return (
          <div className="bg-white flex w-full items-center px-4 py-2 shadow-b shadow-md fixed ">
            <div className="flex p-2 items-center gap-2">
                <img src="/assets/profile.jpeg" className="rounded-full w-10 h-10" />
                  <p>Chutku</p>
            </div>
            <div className="flex items-center gap-4">
            <VideoIcon />
                  <SearchIcon2/>
                  <OptionsIcon />
            </div>
              
          </div>
    )
}

