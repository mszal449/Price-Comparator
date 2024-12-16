import React from "react";
import { IProductPrices } from "../../types";

const ProductPreview = (productPrices: IProductPrices) => {
  return (
    <div className="flex w-full flex-col gap-2 border border-gray-700 p-4">
      <div className="text-2xl">{productPrices.product_id}</div>
      <div className="text-gray-400">
        {productPrices.product_name
          ? productPrices.product_name
          : "Opis produktu nie jest dostępny."}
      </div>
      <div>
        {productPrices.prices && (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  Sklep
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  Cena po przewalutowaniu
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  Cena przed przewalutowaniem
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  Dostępność (w sztukach)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  Data dodania
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-900">
              {productPrices.prices
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
                      {new Date(price.updated_at).toLocaleString()}
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
