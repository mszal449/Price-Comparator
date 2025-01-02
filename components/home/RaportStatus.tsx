"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const RaportStatus = () => {
  const [raportStatus, setRaportStatus] = React.useState<string>("Oczekiwanie");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchReportStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/raport/status");
        const data = await response.json();
        const status = data.status;
        if (status === "ready") {
          setRaportStatus("ready");
        } else {
          setRaportStatus("pending");
        }
      } catch (error: any) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchReportStatus();
  }, []);

  return (
    <div>
      <div className="pb-6 text-2xl">
        Status raportu:
        {isLoading ? (
          <span>Ładowanie...</span>
        ) : (
          <span
            className={` ${raportStatus === "ready" ? "text-green-500" : "text-red-500"}`}
          >
            {raportStatus === "ready" ? " Wygenerowano" : " Oczekiwanie"}
          </span>
        )}
      </div>
      {!isLoading && (
        <Link
          href="/raport"
          className={`m-4 rounded-md p-4 text-white duration-150 ease-in ${
            raportStatus === "ready" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {raportStatus === "ready" ? "Przeglądaj" : "Przeglądaj nieaktualny"}
        </Link>
      )}
    </div>
  );
};

export default RaportStatus;
