import { useState } from "react";
// import { branches } from "../data/branchesData";

export default function DistrictSearch({ onSelectDistrict, warehouses }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const  branches  = warehouses;

  const handleSearch = (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = branches.filter((b) =>
      b.district.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSelect = (district) => {
    onSelectDistrict(district); // send district to map
    setQuery(district.district);
    setResults([]);
  };

  return (
    <div className="w-full z-50 max-w-xl mx-auto mb-6 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search district..."
        className="input input-bordered w-full shadow"
      />

      {/* Dropdown Results */}
      {results.length > 0 && (
        <ul className="absolute bg-white border w-full rounded shadow-lg mt-1 z-50">
          {results.map((district, index) => (
            <li
              key={index}
              onClick={() => handleSelect(district)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {district.district}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
