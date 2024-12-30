"use client";
import React, { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import fetchProductPrices from "services/priceService";
import { IProductPrices, IProductPricesResponse, ISearchOptions } from "types";
import SearchOptionsPanel from "./SearchOptionsPanel";
import PaginationPanel from "./PaginationPanel";

const getInitialSearchOptions = (): ISearchOptions => {
  const initialOptions = {
    preciseName: true,
    onlyAvailable: false,
    page: 1,
    pageSize: 10,
    totalCount: 1,
  };

  if (typeof window !== "undefined") {
    const storedOptions = localStorage.getItem("searchOptions");

    if (storedOptions) {
      const parsedOptions = JSON.parse(storedOptions);
      const hasAllKeys = Object.keys(initialOptions).every(
        (key) => key in parsedOptions,
      );
      if (hasAllKeys) {
        return parsedOptions;
      } else {
        localStorage.setItem("searchOptions", JSON.stringify(initialOptions));
        return initialOptions;
      }
    }
    return initialOptions;
  }
  return initialOptions as ISearchOptions;
};

const RaportPage = () => {
  const [product, setProduct] = useState<IProductPrices[] | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [mounted, setMounted] = useState(false);
  const [searchOptions, setSearchOptions] = useState<ISearchOptions>(
    getInitialSearchOptions,
  );
  const [searchedProduct, setSearchedProduct] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchOptions", JSON.stringify(searchOptions));
    console.log(searchOptions);
  }, [searchOptions]);

  const updateProduct = async () => {
    if (productId === "") {
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

      const data = response.data as IProductPricesResponse;
      setSearchOptions((prev) => ({ ...prev, totalCount: data.totalCount }));
      setProduct(data.products);
      setSearchedProduct(productId);
      setError(null);
    } catch (error) {
      console.error("Error fetching product prices", error);
    }
  };

  useEffect(() => {
    if (searchedProduct) {
      updateProduct();
    }
  }, [searchOptions.page]);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchOptions((prev) => ({ ...prev, page: 1 }));
          updateProduct();
        }}
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
      {product && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <span className="text-2xl">Wyniki dla {`"${searchedProduct}"`}:</span>
          {mounted && !searchOptions.preciseName && (
            <PaginationPanel
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              updateProduct={updateProduct}
            />
          )}
          <div className="flex flex-col items-center gap-2">
            {product.map(
              (p) =>
                p.prices && (
                  <div key={p.product_id} className="w-[80%]">
                    <ProductPreview {...p} />
                  </div>
                ),
            )}
          </div>
          {mounted && !searchOptions.preciseName && (
            <PaginationPanel
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              updateProduct={updateProduct}
            />
          )}
        </div>
      )}

      {product && product.length === 0 && (
        <div>Nie znaleziono cen dla danego produktu.</div>
      )}
    </div>
  );
};

export default RaportPage;
