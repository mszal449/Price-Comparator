"use client";
import React, { useState } from "react";
import { IProductPrices } from "../../types";
import ProductPreview from "./ProductPreview";
import fetchProductPrices from "services/priceService";

const RaportPage = () => {
  const [product, setProduct] = useState<IProductPrices | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Product ID: ${productId}`); // Added log
    console.log(process.env.REACT_APP_API_ACCESS_KEY); // Added log
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
