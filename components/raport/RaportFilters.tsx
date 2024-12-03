"use client";
import React, { useState } from "react";

const RaportFilters = () => {
  const [localName, setLocalName] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(event.target.value);
    console.log(localName);
  };

  return (
    <div className="flex flex-col justify-start border border-gray-800 p-2">
      <div className="text-start text-xl">Filtry</div>

      <div className="flex flex-col items-start">
        <span className="filter-label">Nazwa</span>
        <input
          type="text"
          className="filter-input"
          value={localName}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
};

export default RaportFilters;
