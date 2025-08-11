import {BrowserRouter, Route} from 'react-router-dom';
import Sidebar from './ui/containers/Sidebar';
import Navbar from './ui/containers/Navbar';
import ChatContainer from './ui/containers/ChatContainer';
import ChatBar from './ui/containers/ChatBar';

export default function Layout(){
    return (
        <div className="flex"> 
            <Navbar />
            <Sidebar/>
            <ChatContainer />
        </div>
    )
  }