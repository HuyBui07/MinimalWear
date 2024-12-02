import { FaTimes } from "react-icons/fa";

export default function SearchBar({setSearchModeOn} : {setSearchModeOn: (value: boolean) => void}) {
  return (
    <div className="flex flex-row w-2/3 h-20 items-center px-28 border-b-2 m-auto gap-x-5">
      <input
        type="text"
        className="w-full h-12 border-2 border-gray-300 rounded-2xl px-4 bg-white"
        placeholder="Search"
      />
      <FaTimes
        className="ml-auto text-2xl cursor-pointer"
        onClick={() => setSearchModeOn(false)}
      />
    </div>
  );
}
