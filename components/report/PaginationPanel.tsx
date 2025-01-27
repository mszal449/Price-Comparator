"use client";
import React from "react";
import { ISearchOptions } from "types";

interface PaginationPanelProps {
  searchOptions: ISearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
  updateProduct: () => void;
}

const PaginationPanel: React.FC<PaginationPanelProps> = ({
  searchOptions,
  setSearchOptions,
}) => {
  const totalPages = Math.ceil(
    searchOptions.totalCount / searchOptions.pageSize,
  );

  const goToPreviousPage = () => {
    setSearchOptions((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const goToNextPage = () => {
    setSearchOptions((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-800 bg-black p-2 text-white">
      <button
        className={`rounded-md border border-gray-600 px-3 py-1 hover:bg-gray-700 ${
          searchOptions.page <= 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={goToPreviousPage}
        disabled={searchOptions.page <= 1}
      >
        Poprzednia strona
      </button>
      <span>
        Strona {searchOptions.page} z {totalPages || 1}
      </span>
      <button
        className={`rounded-md border border-gray-600 px-3 py-1 hover:bg-gray-700 ${
          searchOptions.page >= totalPages
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        onClick={goToNextPage}
        disabled={searchOptions.page >= totalPages}
      >
        Następna strona
      </button>
    </div>
  );
};

export default PaginationPanel;
