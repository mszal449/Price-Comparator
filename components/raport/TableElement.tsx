import React from "react";

interface TableElementProps {
  name: string;
  price: number;
}

const TableElement = ({ name, price }: TableElementProps) => {
  return (
    <div className="flex">
      <div>
        {name} {price}
      </div>
    </div>
  );
};
export default TableElement;
