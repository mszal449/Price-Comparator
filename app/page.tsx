import RaportStatus from "components/home/RaportStatus";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[100px]">
      <div className="text-center">
        <div className="pb-4 text-4xl">
          InkCheck - porównaj ceny w jednym miejscu.
        </div>
        <RaportStatus />
      </div>
    </div>
  );
}
