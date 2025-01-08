import React from "react";
import RaportStatus from "./RaportStatus";

const HomePage = async () => {
  return (
    <div className="text-center">
      <div className="pb-4 text-4xl">
        InkCheck - porównaj ceny w jednym miejscu.
      </div>
      <RaportStatus />
    </div>
  );
};

export default HomePage;
