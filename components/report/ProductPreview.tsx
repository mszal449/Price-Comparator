"use client";
import React, { useState } from "react";
import { IProductPrices } from "types";

interface ProductPreviewProps extends IProductPrices {
  today: string;
}

const ProductPreview = ({ product_id, prices, today }: ProductPreviewProps) => {
  const [showDiscountByIndex, setShowDiscountByIndex] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <div className="flex w-full flex-col gap-2 border border-gray-700 p-4">
      <div className="text-2xl">{product_id}</div>
      <div className="text-gray-400">
        {prices &&
          prices
            .sort((a, b) => a.shop_id - b.shop_id)
            .map((price) => {
              return <div key={price.shop_id}>{price.shop_description}</div>;
            })}
      </div>
      <div>
        {prices && (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Sklep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Cena po przewalutowaniu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Cena przed przewalutowaniem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Stan magazynowy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Data aktualizacji
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Cena po rabacie
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-900">
              {prices
                .sort((a, b) => a.price_in_pln - b.price_in_pln)
                .map((price, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                      {price.shop_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {price.price_in_pln} PLN
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {price.price} {price.currency}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {price.stock}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      <span
                        className={
                          new Date(price.updated_at).toLocaleDateString() !==
                          new Date(today).toLocaleDateString()
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {new Date(price.updated_at).toLocaleString()}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {!showDiscountByIndex[index] ? (
                        <button
                          onClick={() =>
                            setShowDiscountByIndex((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                          className="rounded-md bg-purple-500 p-2 duration-150 ease-in hover:bg-purple-600"
                        >
                          Pokaż
                        </button>
                      ) : (
                        <div className="p-2">
                          {((price.price_in_pln / 0.57412347) * 0.38).toFixed(
                            2,
                          )}{" "}
                          PLN
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductPreview;
