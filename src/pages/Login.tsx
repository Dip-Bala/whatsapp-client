import { BsWhatsapp } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import {API_URL} from '../config';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // console.log("Login with:", { name, email });
    try{
      const response = await axios.post(`${API_URL}/login`, {
        name: name,
        email: email
      }, {
        headers: {
          contentType: 'application/json'
        }
      })
      if(response.status === 200){
        localStorage.setItem('authorization', response.data.token);
        navigate('/chat')
      }
      else{
        
      }
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#fcf5eb] text-black">
      {/* Top header bar */}
      <div className="text-green-500 flex items-center gap-2 px-6 py-4">
        <BsWhatsapp className="w-8 h-8" />
        <h4 className="text-lg font-semibold">WhatsApp</h4>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center">
        {/* <div className="p-8 max-w-lg w-full"> */}
          {/* Heading */}
          <div className="flex flex-col items-center justify-between pb-4 mb-6 gap-4 ">
            <h1 className="text-5xl">WhatsApp Web</h1>
            <span className="flex items-center justify-between gap-2 text-mediumdarkgray/90"> <MdLockOutline className="w-5 h-5" /> Your personal messages are end to end encrypted</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            To use WhatsApp Web, please enter your name and email to log in.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Your Name"
              className="border-b border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00a884]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border-b border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00a884]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-[#029c7d] transition-colors"
            >
              Login
            </button>
          </form>
        {/* </div> */}
      </div>
    </div>
  );
}
