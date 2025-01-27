"use client";
import React, { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { IProductPrices, ISearchOptions } from "types";
import SearchOptionsPanel from "./SearchOptionsPanel";
import PaginationPanel from "./PaginationPanel";
import Spinner from "../utils/Spinner";

const getInitialSearchOptions = (): ISearchOptions => {
  const initialOptions = {
    preciseName: false,
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
  }
  return initialOptions;
};

const ReportPage = () => {
  const [product, setProduct] = useState<IProductPrices[] | null>(null);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState<string | null>("");
  const [mounted, setMounted] = useState(false);
  const [searchOptions, setSearchOptions] = useState<ISearchOptions>(
    getInitialSearchOptions,
  );
  const [searchedProduct, setSearchedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState<string>();

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    setToday(date.toISOString().split("T")[0]);
  }, []);

  // Store searchOptions in localStorage on each update
  useEffect(() => {
    localStorage.setItem("searchOptions", JSON.stringify(searchOptions));
  }, [searchOptions]);

  useEffect(() => {
    updateProduct();
  }, [searchOptions.page]);

  const updateProduct = async () => {
    if (!productId) {
      setError("Musisz podać unikalny identyfikator produktu.");
      return;
    }
    try {
      setIsLoading(true);
      setProduct(null);
      const query = new URLSearchParams({
        preciseName: searchOptions.preciseName ? "true" : "false",
        onlyAvailable: searchOptions.onlyAvailable ? "true" : "false",
        page: searchOptions.page.toString(),
        pageSize: searchOptions.pageSize.toString(),
      });
      const url = `/api/products/${productId}?${query.toString()}`;
      const res = await fetch(url, {
        method: "GET",
      });

      if (res.status === 404) {
        setError("Nie znaleziono cen produktu o podanym identyfikatorze.");
        setProduct(null);
        return;
      }

      if (!res.ok) {
        setError("Błąd komunikacji z serwerem.");
        setProduct(null);
        return;
      }

      const data = await res.json();
      setSearchOptions((prev) => ({ ...prev, totalCount: data.totalCount }));
      setProduct(data.products || null);
      setSearchedProduct(productId);
      setError(null);
    } catch (error) {
      console.error("Error fetching product prices", error);
      setError("Musisz podać unikalny identyfikator produktu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOptions((prev) => ({ ...prev, page: 1 }));
    updateProduct();
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handle_submit}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-2xl">Wyszukaj produkt</span>
        <div>
          <input
            className={`rounded-l-md border border-gray-800 p-2 pr-0 text-xl ${
              isLoading ? "bg-gray-900 text-gray-400" : "bg-black text-white"
            } ${error ? "border-red-500" : ""}`}
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
        {error && <div className="text-red-500">{error}</div>}
        <SearchOptionsPanel
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />
      </form>

      {/* Products */}
      {isLoading && mounted && <Spinner />}
      {product && today && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <span className="text-2xl">Wyniki dla “{searchedProduct}”:</span>
          {mounted && !searchOptions.preciseName && (
            <PaginationPanel
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              updateProduct={updateProduct}
            />
          )}
          <div className="flex flex-col items-center gap-2">
            {product.map((p) =>
              p.prices ? (
                <div key={p.product_id} className="w-[80%]">
                  <ProductPreview today={today} {...p} />
                </div>
              ) : null,
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
export default ReportPage;
