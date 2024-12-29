import React from "react";
import { ISearchOptions } from "types";

interface PaginationPanelProps {
  searchOptions: ISearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}

const PaginationPanel: React.FC<PaginationPanelProps> = ({
  searchOptions,
  setSearchOptions,
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

  return (
    <div className="rouned-md flex items-center gap-2 border">
      <button onClick={goToPreviousPage} disabled={searchOptions.page <= 1}>
        Prev
      </button>
      <span>
        Page {searchOptions.page} of {totalPages || 1}
      </span>
      <button
        onClick={goToNextPage}
        disabled={searchOptions.page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationPanel;
