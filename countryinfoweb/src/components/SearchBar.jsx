import React from 'react';

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search country by name..."
      className="w-full p-3 border-[2px] rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
