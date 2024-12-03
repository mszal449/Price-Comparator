"use client";
import React, { useEffect, useState } from "react";
import RaportFilters from "./RaportFilters";
import RaportTable from "./RaportTable";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Raport {
  count: number;
  products: Product[];
}

const RaportPage = () => {
  const [raport, setRaport] = useState<Raport | null>(null);
  const [isLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFilters({});
    setRaport(getSampleRaport(filters));
  }, []);

  return (
    <div className="text-center">
      {isLoading && <div>Ładowanie...</div>}
      {raport && (
        <div>
          <div className="text-2xl">Raport</div>
          <div className="text-lg">Liczba produktów: {raport.count}</div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-start-1 col-end-4">
          <RaportFilters />
        </div>
        <div className="col-start-4 col-end-13">
          <RaportTable />
        </div>
      </div>
    </div>
  );
};

export default RaportPage;

const getSampleRaport = (filters: { [key: string]: string }): Raport => {
  console.log(filters);

  return {
    count: 4,
    products: [
      { id: 1, name: "Product 1", price: 10.99 },
      { id: 2, name: "Product 2", price: 15.49 },
      { id: 3, name: "Product 3", price: 20.0 },
      { id: 4, name: "Product 4", price: 25.75 },
    ],
  };
};
