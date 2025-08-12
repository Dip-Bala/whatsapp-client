import { BiSolidMessageDetail, BiMessageDetail } from "react-icons/bi";
import { TbCircleDashed, TbMessageCircleFilled } from "react-icons/tb";
import { LuMessageCircleDashed } from "react-icons/lu";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { PiCircleDashedFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { navAtom } from "../../hooks/atom";
import IconButton from "../components/IconButtons";

export default function Navbar() {
  const [navItem, setNavItem] = useRecoilState(navAtom);

  return (
    <div className="bg-pampas w-full h-16 md:h-screen md:w-16 fixed md:left-0 md:right-0 bottom-0 p-4 md:border-r border-gray-200 border-t">
      <div className="flex gap-2 md:flex-col items-center w-full justify-around">
        <IconButton
          isActive={navItem === "messages"}
          onClick={() => setNavItem("messages")}
          activeIcon={<BiSolidMessageDetail className="text-black w-6 h-6" />}
          inactiveIcon={<BiMessageDetail className="text-mediumdarkgray w-6 h-6" />}
        />

        <IconButton
          isActive={navItem === "status"}
          onClick={() => setNavItem("status")}
          activeIcon={<PiCircleDashedFill className="text-black w-6 h-6" />}
          inactiveIcon={<TbCircleDashed className="text-mediumdarkgray w-6 h-6" />}
        />

        <IconButton
          isActive={navItem === "channels"}
          onClick={() => setNavItem("channels")}
          activeIcon={<TbMessageCircleFilled className="text-black w-6 h-6" />}
          inactiveIcon={<LuMessageCircleDashed className="text-mediumdarkgray w-6 h-6" />}
        />

        <IconButton
          isActive={navItem === "community"}
          onClick={() => setNavItem("community")}
          activeIcon={<BsPeopleFill className="text-black w-6 h-6" />}
          inactiveIcon={<BsPeople className="text-mediumdarkgray w-6 h-6" />}
        />

      </div>
    </div>
  );
}
