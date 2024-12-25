"use client";
import React, { useState } from "react";
import { ISearchOptions } from "types";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface ISearchOptionsPanelProps {
  searchOptions: ISearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}

const SearchOptionsPanel = ({
  searchOptions,
  setSearchOptions,
}: ISearchOptionsPanelProps) => {
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  const updateSearchOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSearchOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      {!optionsOpen ? (
        <button
          className="flex w-full items-center justify-center border border-gray-800 bg-black p-2 text-xl text-white duration-150 ease-in hover:bg-gray-800"
          onClick={() => setOptionsOpen(!optionsOpen)}
        >
          Opcje wyszukiwania{" "}
          <span>
            <GoChevronDown />
          </span>
        </button>
      ) : (
        <div className="w-full border border-gray-800 bg-black">
          <div className="w-full text-center text-xl text-white duration-150 ease-in hover:bg-gray-800">
            <button
              className="flex w-full items-center justify-center py-2"
              onClick={() => setOptionsOpen(!optionsOpen)}
            >
              Zamknij
              <span className="ml-2">
                <GoChevronUp />
              </span>
            </button>
          </div>
          <div className="items center flex flex-col gap-2 p-1">
            <div className="flex items-baseline">
              <input
                type="checkbox"
                id="preciseName"
                name="preciseName"
                checked={searchOptions.preciseName}
                onChange={updateSearchOptions}
                className="cursor-pointer"
              />
              <label className="ml-1 select-none" htmlFor="preciseName">
                Dokładne wyszukiwanie nazwy
              </label>
            </div>
            <div className="flex items-baseline">
              <input
                type="checkbox"
                id="onlyAvailable"
                name="onlyAvailable"
                checked={searchOptions.onlyAvailable}
                onChange={updateSearchOptions}
                className="cursor-pointer"
              />
              <label
                className="ml-1 cursor-pointer select-none"
                htmlFor="onlyAvailable"
              >
                Tylko dostępne
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchOptionsPanel;
