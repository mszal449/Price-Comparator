import { useState } from "react";
import React from "react";
import type { IReportFilters } from "types";
import { GoDash } from "react-icons/go";

interface IReportFiltersProps {
  filters: IReportFilters;
  setFilters: (filters: IReportFilters) => void;
}

const ReportFilters = ({ setFilters }: IReportFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<IReportFilters>({
    productId: "",
    minStock: 0,
    minPrice: null,
    maxPrice: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = value === "" ? null : parseFloat(value);
    if (parsedValue !== null && parsedValue < 0) {
      return;
    }
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parsedValue,
    }));
  };

  const updateFilters = () => {
    setFilters(localFilters);
  };

  const resetFilters = () => {
    setLocalFilters({
      productId: "",
      minStock: 0,
      minPrice: null,
      maxPrice: null,
    });
  };

  return (
    <div className="flex flex-col justify-start rounded-sm border border-gray-800 p-2">
      <div className="text-start text-xl">Filtry</div>
      <div className="my-2 flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <span className="filter-label">ID Produktu</span>
          <input
            type="text"
            name="productId"
            className="filter-input"
            value={localFilters.productId}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-start">
          <span className="filter-label">Dostępność (sztuki)</span>
          <input
            type="number"
            name="minStock"
            className="filter-input"
            value={localFilters.minStock ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-start">
          <span className="filter-label">Minimalna Cena</span>
          <div className="flex items-center justify-around">
            <input
              type="number"
              name="minPrice"
              className="filter-input"
              placeholder="Do"
              value={localFilters.minPrice ?? ""}
              onChange={handleChange}
            />
            <GoDash className="mx-2 text-4xl" />
            <input
              type="number"
              name="maxPrice"
              className="filter-input"
              placeholder="Do"
              value={localFilters.maxPrice ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button className="filter-button" onClick={resetFilters}>
            Wyczyść Filtry
          </button>
          <button className="filter-button" onClick={updateFilters}>
            Filtruj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
