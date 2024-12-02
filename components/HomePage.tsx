import Link from "next/link";
import React from "react";

const HomePage = () => {
  const isReportReady = true;

  return (
    <div className="text-center">
      <div className="pb-4 text-4xl">
        InkCheck - porównaj ceny w jednym miejscu.
      </div>
      <div className="pb-6 text-2xl">
        Status raportu:
        <span
          className={` ${isReportReady ? "text-green-500" : "text-red-500"}`}
        >
          {isReportReady ? " Wygenerowano" : " Oczekiwanie"}
        </span>
      </div>
      {isReportReady ? (
        <Link
          href="/raport"
          className="m-4 rounded-md bg-green-400 p-4 text-black duration-150 ease-in hover:bg-green-600"
        >
          Przeglądaj
        </Link>
      ) : (
        <button className="bg-green-400">Wygeneruj raport</button>
      )}
    </div>
  );
};

export default HomePage;
