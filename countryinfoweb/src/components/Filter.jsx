import React from 'react';

export default function Filter({ onFilter }) {
  const regions = ['All', 'Asia', 'Europe', 'Africa', 'Oceania', 'Americas'];
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {regions.map((region) => (
        <button
          key={region}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          onClick={() => onFilter(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
