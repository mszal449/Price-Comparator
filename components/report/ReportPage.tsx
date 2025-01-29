"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { IProductPrices, ISearchOptions } from "types";
import SearchOptionsPanel from "./SearchOptionsPanel";
import PaginationPanel from "./PaginationPanel";
import Spinner from "../utils/Spinner";

const useSearchOptions = (): [
  ISearchOptions,
  (
    options: ISearchOptions | ((prev: ISearchOptions) => ISearchOptions),
  ) => void,
] => {
  const getInitialSearchOptions = (): ISearchOptions => ({
    preciseName: false,
    onlyAvailable: false,
    page: 1,
    pageSize: 10,
    totalCount: 1,
  });

  const [searchOptions, setSearchOptions] = useState<ISearchOptions>(() => {
    if (typeof window !== "undefined") {
      const storedOptions = localStorage.getItem("searchOptions");
      if (storedOptions) {
        const parsedOptions = JSON.parse(storedOptions);
        const hasAllKeys = Object.keys(getInitialSearchOptions()).every(
          (key) => key in parsedOptions,
        );
        if (hasAllKeys) return parsedOptions;
      }
    }
    return getInitialSearchOptions();
  });

  const updateSearchOptions = (
    newOptions: ISearchOptions | ((prev: ISearchOptions) => ISearchOptions),
  ) => {
    if (typeof newOptions === "function") {
      setSearchOptions((prev) => {
        const updatedOptions = newOptions(prev);
        localStorage.setItem("searchOptions", JSON.stringify(updatedOptions));
        return updatedOptions;
      });
    } else {
      localStorage.setItem("searchOptions", JSON.stringify(newOptions));
      setSearchOptions(newOptions);
    }
  };

  return [searchOptions, updateSearchOptions];
};

const ReportPage = () => {
  const [product, setProduct] = useState<IProductPrices[] | null>(null);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState<string | null>("");
  const [searchOptions, setSearchOptions] = useSearchOptions();
  const [searchedProduct, setSearchedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState<string>();

  // Fetch date
  useEffect(() => {
    const date = new Date();
    setToday(date.toISOString().split("T")[0]);
  }, []);

  // Fetch products
  const fetchProduct = useCallback(async () => {
    if (!productId && !searchOptions.description) {
      setError("Musisz podać unikalny identyfikator lub opis produktu.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProduct(null);

    try {
      const query = new URLSearchParams({
        id: productId,
        preciseName: searchOptions.preciseName ? "true" : "false",
        onlyAvailable: searchOptions.onlyAvailable ? "true" : "false",
        page: searchOptions.page.toString(),
        pageSize: searchOptions.pageSize.toString(),
        ...(searchOptions.description && {
          description: searchOptions.description,
        }),
      });
      const url = `/api/products/?${query.toString()}`;
      const res = await fetch(url, { method: "GET" });

      if (res.status === 404) {
        setError("Nie znaleziono cen produktu o podanym identyfikatorze.");
        return;
      }

      if (!res.ok) {
        setError("Błąd komunikacji z serwerem.");
        return;
      }

      const data = await res.json();
      setSearchOptions((prev) => ({ ...prev, totalCount: data.totalCount }));
      setProduct(data.products || null);
      setSearchedProduct(productId || searchOptions.description || "");
    } catch (error) {
      console.error("Error fetching product prices", error);
      setError("Wystąpił błąd podczas pobierania danych.");
    } finally {
      setIsLoading(false);
    }
  }, [productId, searchOptions, setSearchOptions]);

  // Handle page change
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [searchOptions.page]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOptions((prev) => ({ ...prev, page: 1 }));
    fetchProduct();
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-2xl">Wyszukaj produkt</span>
        <div>
          <input
            className={`rounded-l-md border border-gray-800 p-2 pr-0 text-xl ${
              isLoading ? "bg-gray-900 text-gray-400" : "bg-black text-white"
            } ${error ? "border-red-500" : ""}`}
            type="text"
            placeholder="Identyfikator"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={isLoading}
          />
          <input
            className={`border border-x-0 border-gray-800 p-2 text-xl ${
              isLoading ? "bg-gray-900 text-gray-400" : "bg-black text-white"
            } ${error ? "border-red-500" : ""} `}
            type="text"
            placeholder="Opis produktu"
            value={searchOptions.description || ""}
            onChange={(e) =>
              setSearchOptions((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            disabled={isLoading}
          />
          <button
            className={`m-2 ml-0 rounded-r-md border p-2 text-xl ${
              isLoading
                ? "cursor-wait border-gray-500 bg-gray-500 text-gray-300"
                : "border-purple-500 bg-purple-500 transition-colors duration-150 ease-in hover:bg-purple-600"
            }`}
            disabled={isLoading}
          >
            Szukaj
          </button>
        </div>
        <div></div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex gap-2">
          <SearchOptionsPanel
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
          <button
            type="button"
            onClick={() => {
              setProductId("");
              setSearchOptions((prev) => ({
                ...prev,
                description: "",
                page: 1,
              }));
              setProduct(null);
              setError(null);
            }}
            className="h-auto self-start rounded-md border border-gray-800 p-2 text-xl text-white duration-150 ease-in hover:bg-gray-800"
          >
            Wyczyść
          </button>
        </div>
      </form>

      {isLoading && <Spinner />}
      {product && today && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <span className="text-2xl">Wyniki dla “{searchedProduct}”:</span>
          {!searchOptions.preciseName && (
            <PaginationPanel
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              updateProduct={fetchProduct}
            />
          )}
          <div className="flex flex-col items-center gap-2">
            {product.map((p) =>
              p.prices ? (
                <div key={p.product_id} className="w-[85%]">
                  <ProductPreview today={today} {...p} />
                </div>
              ) : null,
            )}
          </div>
          {!searchOptions.preciseName && (
            <PaginationPanel
              updateProduct={fetchProduct}
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
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

export default ReportPage;
