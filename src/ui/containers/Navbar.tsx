import {CommunityIconDark, CommunityIconLight, MessageIcon, SettingsIconDark, SettingsIconLight, StatusIconDark, StatusIconLight } from '../icons/NavbarIcons'


export default function Navbar(){
    return (
          <div className="bg-pampas h-screen w-16 flex flex-col fixed left-0 right-0 p-4 border-r border-gray-200">
              <div>
              <Button type={"Icon"} theme={"Light"} text={"Message"}/>
              <Button type={"Icon"} theme={"Light"} text={"Status"}/>
              <Button type={"Icon"} theme={"Light"} text={"Community"}/>
              <Button type={"Icon"} theme={"Light"} text={"Settings"}/>
              </div>
          </div>
    )
}

type buttonTheme = "Light" | "Dark";
type buttonText = "Message" | "Status" | "Community" | "Channel" | "Settings";
type buttonType = "Icon" | "Normal";

// const buttonTextStyle: Record<buttonText, string> = {
//     message : ""
// }

interface IIcon{
    theme: buttonTheme,
    text : buttonText
}
function Icon({theme, text}: any){
    if (text==="Message") return <MessageIcon />
    // if (theme === "Dark" && text==="Message") return <MessageIcon />
    if (theme === "Light" && text==="Community") return <CommunityIconLight />
    if (theme === "Dark" && text==="Community") return <CommunityIconDark /> 
    if (theme === "Light" && text==="Status") return <StatusIconLight />
    if (theme === "Dark" && text==="Status") return <StatusIconDark /> 
    if (theme === "Light" && text==="Settings") return <SettingsIconLight />
    if (theme === "Dark" && text==="Settings") return <SettingsIconDark />
    // if (theme === "Light" && text==="Message") return <MessageIconLight />
    // if (theme === "Dark" && text==="Message") return <MessageIconDark />
    // if (theme === "Light" && text==="Message") return <MessageIconLight />
    // if (theme === "Dark" && text==="Message") return <MessageIconDark />
}

interface IButtons{
    theme: buttonTheme,
    type: buttonType,
    text:  buttonText
}

function Button({theme, type, text}: any){
    // const icon = 
    return(
        <button type="button" className="focus:bg-">
            <Icon theme={theme} text={text} className="text-black"/>
            {type === "normal"? <span>{text}</span> : null}
        </button>
    )
}

