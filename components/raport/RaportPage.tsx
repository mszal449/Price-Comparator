"use client";
import React, { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import fetchProductPrices from "services/priceService";
import { IProductPricesArray, ISearchOptions } from "types";
import SearchOptionsPanel from "./SearchOptionsPanel";
import PaginationPanel from "./PaginationPanel";

const getInitialSearchOptions = (): ISearchOptions => {
  if (typeof window !== "undefined") {
    const storedOptions = localStorage.getItem("searchOptions");
    return storedOptions
      ? JSON.parse(storedOptions)
      : { preciseName: true, onlyAvailable: false };
  }
  return {
    preciseName: true,
    onlyAvailable: false,
    page: 1,
    pageSize: 10,
  } as ISearchOptions;
};

const RaportPage = () => {
  const [product, setProduct] = useState<IProductPricesArray | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const [searchOptions, setSearchOptions] = useState<ISearchOptions>(
    getInitialSearchOptions,
  );

  useEffect(() => {
    localStorage.setItem("searchOptions", JSON.stringify(searchOptions));
  }, [searchOptions]);

  const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productId === "" && searchOptions.preciseName) {
      setError("Musisz podać unikalny identyfikator produktu.");
      return;
    }
    try {
      const response = await fetchProductPrices(productId, searchOptions);
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

      const data = response.data as IProductPricesArray;
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
        {error && <div className="text-red-500">{error}</div>}
        <SearchOptionsPanel
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />
      </form>
      {product &&
        product.map(
          (p) =>
            p.prices && (
              <div key={p.product_id} className="w-[80%]">
                <span className="mb-4 text-2xl">Wyniki:</span>
                <ProductPreview {...p} />
              </div>
            ),
        )}

      {product && product.length === 0 && (
        <div>Nie znaleziono cen dla danego produktu.</div>
      )}

      <PaginationPanel
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
    </div>
  );
};

export default RaportPage;
