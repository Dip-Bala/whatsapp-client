import { IoMdSearch } from "react-icons/io";

export default function SearchBar(){
  return (
    <div className="py-2 relative">
      <IoMdSearch className="absolute top-5 left-4"/>
      <input type="search" 
      placeholder="Search or Start a new chat"
      className="w-full pl-12 py-2 focus:bg-white flex items-center bg-brownishgray rounded-4xl placeholder:text-sm placeholder:text-mediumdarkgray focus:outline-logogreen flex-1" 
      ></input>
    </div>

  )
}