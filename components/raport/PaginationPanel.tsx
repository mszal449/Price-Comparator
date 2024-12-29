"use client";
import React, { useEffect } from "react";
import { ISearchOptions } from "types";

interface PaginationPanelProps {
  searchOptions: ISearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
  updateProduct: () => void;
}

const PaginationPanel: React.FC<PaginationPanelProps> = ({
  searchOptions,
  setSearchOptions,
  updateProduct,
}) => {
  const totalPages = Math.ceil(
    searchOptions.totalCount / searchOptions.pageSize,
  );

  const goToPreviousPage = () => {
    if (searchOptions.page > 1) {
      setSearchOptions((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const goToNextPage = () => {
    if (searchOptions.page < totalPages) {
      setSearchOptions((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  useEffect(() => {
    updateProduct();
  }, [searchOptions.page]);

  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-800 bg-black p-2 text-white">
      <button
        className="rounded-md border border-gray-600 px-3 py-1 hover:bg-gray-700"
        onClick={goToPreviousPage}
      >
        Poprzednia strona
      </button>
      <span>
        Strona {searchOptions.page} z {totalPages || 1}
      </span>
      <button
        className="rounded-md border border-gray-600 px-3 py-1 hover:bg-gray-700"
        onClick={goToNextPage}
      >
        Następna strona
      </button>
    </div>
  );
};

export default PaginationPanel;
