import { SearchIcon } from "../icons/NavbarIcons";

export default function SearchBar(){
  return (
    <div className="py-2 relative ">
      <SearchIcon />
      <input type="search" 
      placeholder="Search or Start a new chat"
      className="w-full bg-pampas rounded-4xl pl-12 py-2 hover:outline placeholder:text-sm placeholder:text-mediumdarkgray focus:border-none focus:outline-logogreen focus:bg-white flex items-center" 
      ></input>
    </div>

  )
}