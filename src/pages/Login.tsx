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
    try{
      const response = await axios.post(`${API_URL}/login`, {
        name: name,
        email: email
      }, {
        headers: {
          contentType: 'application/json'
        }
      })
      if(response.status === 200 || response.status === 201){
        console.log(response)
        localStorage.setItem('authorization', response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/chat')
      }
      else{
        alert(response.data.message);
      }
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#fcf5eb] text-black">
      {/* Top header bar */}
      <div className="text-green-500 flex items-center gap-2 p-8">
        <BsWhatsapp className="w-8 h-8" />
        <h4 className="text-lg font-semibold">WhatsApp</h4>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="p-16 max-w-7xl bg-white rounded-4xl border">
          {/* Heading */}
          {/* <div className="flex flex-col items-center justify-between  gap-4 ">
          </div> */}
          {/* Description */}
          <p className=" mb-6 text-lg">
            To use WhatsApp Web, please enter your name and email to log in.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Name"
              className="border-b px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logogreen hover:rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border-b px-4 py-2 focus:outline-none focus:ring-2 focus:ring-logogreen hover:rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-transparent cursor-pointer hover:border hover:text-green-600 transition-colors mt-8"
            >
              Enter
            </button>
          </form>
        </div>
            <span className="flex items-center justify-between gap-2 text-mediumdarkgray/90 mt-8"> <MdLockOutline className="w-5 h-5 " /> Your personal messages are end to end encrypted</span>
      </div>
    </div>
  );
}
