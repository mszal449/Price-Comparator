"use client";
import React, { useEffect, useState } from "react";
import { IProductPrices } from "../../types";
import ProductPreview from "./ProductPreview";
import fetchProductPrices from "services/priceService";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface ISearchOptions {
  preciseName: boolean;
  onlyAvailable: boolean;
}

const RaportPage = () => {
  const [product, setProduct] = useState<IProductPrices | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  const getInitialSearchOptions = (): ISearchOptions => {
    if (typeof window !== "undefined") {
      const storedOptions = localStorage.getItem("searchOptions");
      return storedOptions
        ? JSON.parse(storedOptions)
        : { preciseName: true, onlyAvailable: false };
    }
    return { preciseName: true, onlyAvailable: false };

    const [searchOptions, setSearchOptions] = useState<ISearchOptions>(
      getInitialSearchOptions,
    );
  };

  useEffect(() => {
    localStorage.setItem("searchOptions", JSON.stringify(searchOptions));
  }, [searchOptions]);

  const updateSearchOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSearchOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productId === "") {
      setError("Musisz podać unikalny identyfikator produktu.");
      return;
    }
    try {
      const response = await fetchProductPrices(productId);
      if (response.status === 404) {
        setError("Nie znaleziono produktu.");
        setProduct(null);
        return;
      }
      if (response.status !== 200) {
        setError("Błąd komunikacji z serwerem.");
        setProduct(null);
        return;
      }

      const data = response.data as IProductPrices;
      console.log(data);
      setProduct(data);
      setError(null);
    } catch {
      setError("Musisz podać unikalny identyfikator produktu.");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={updateProduct}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-2xl">Wyszukaj produkt</span>
        <div>
          <input
            className={`rounded-l-md border border-gray-800 bg-black p-2 pr-0 text-xl text-white ${error ? "border-red-500" : ""}`}
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button className="m-2 ml-0 rounded-r-md border border-purple-500 bg-purple-500 p-2 text-xl duration-150 ease-in hover:bg-purple-600">
            Szukaj
          </button>
        </div>
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
                  value={searchOptions.preciseName}
                  onChange={updateSearchOptions}
                  className="cursor-pointer"
                />
                <label className="ml-1 cursor-pointer" htmlFor="preciseName">
                  Dokładne wyszukiwanie nazwy
                </label>
              </div>
              <div className="flex items-baseline">
                <input
                  type="checkbox"
                  id="onlyAvailable"
                  name="onlyAvailable"
                  value={searchOptions.onlyAvailable}
                  onChange={updateSearchOptions}
                  className="cursor-pointer"
                />
                <label className="ml-1 cursor-pointer" htmlFor="onlyAvailable">
                  Tylko dostępne
                </label>
              </div>
            </div>
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}
      </form>

      {product && product.prices && (
        <div className="w-[80%]">
          <span className="mb-4 text-2xl">Wyniki:</span>
          <ProductPreview {...product} />
        </div>
      )}

      {product && product.prices && product.prices.length === 0 && (
        <div>Nie znaleziono cen dla danego produktu.</div>
      )}
    </div>
  );
};

export default RaportPage;
