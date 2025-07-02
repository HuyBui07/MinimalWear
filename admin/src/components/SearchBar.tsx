import { FaFilter } from "react-icons/fa";
import Select from "react-select";

export default function SearchBar(props: any) {
  const { searchQuery, setSearchQuery, setOption, options } = props;

  return (
    <div className="flex flex-row relative h-12 items-center justify-between
     border-2 border-gray-300 rounded-xl pl-4 pr-1 bg-white">
      <input
        type="text"
        className="w-80 h-10 focus:outline-none"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select
        placeholder="Filter"
        className="w-28"
        options={options}
        isSearchable={false}
        isClearable={false}
        defaultValue={options[0]}
        onChange={(option) => setOption(option?.value || "")}
        components={{
          DropdownIndicator: () => {
            return <FaFilter className="mx-2" />;
          },
        }}
      />
    </div>
  );
}
