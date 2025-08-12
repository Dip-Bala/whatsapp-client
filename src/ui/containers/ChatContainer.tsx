import ChatBar from "../components/ChatBar";
import InputBox from "../components/InputBox";

export default function ChatContainer(){
    return (
          <div 
          className=" h-screen flex flex-col justify-between flex-1 bg-fixed"
          style={{
            backgroundImage: "url('/assets/background.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no repeat",
            backgroundPosition: "center",
            backgroundColor: "#f5f1ee", 
            backgroundBlendMode: "multiply", 
          }}>
            <ChatBar />
            <div>
              
            </div>
            <InputBox />
          </div>
    )
}

// function Background(){
//       return(
//             <img src="/assets/background.svg" className="w-screen h-screen bg-cover repeat "/>
//       )
// }

