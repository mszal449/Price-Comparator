"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IRaport {
  jarltech: boolean;
  jarltech_count: number;
  ingram_micro_24: boolean;
  ingram_micro_24_count: number;
  koncept_l: boolean;
  koncept_l_count: number;
  created_at: string;
}

const RaportStatus = () => {
  const [raport, setRaport] = useState<IRaport | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [raport_generated, setRaportGenerated] = useState<boolean>(false);

  useEffect(() => {
    const fetchReportStatus = async () => {
      setIsLoading(true);
      try {
        console.log("HERE");
        const response = await fetch(
          `https://price-comparator-api.vercel.app/raport/status`,
        );
        const data = await response.json();
        const raport = data as IRaport;
        console.log(raport);
        setRaport(raport);

        const today = new Date().toISOString().split("T")[0];
        const reportDate = new Date(raport.created_at)
          .toISOString()
          .split("T")[0];
        const isGeneratedToday = today === reportDate;

        setRaportGenerated(
          isGeneratedToday &&
            (raport.jarltech || raport.ingram_micro_24 || raport.koncept_l),
        );
      } catch (error) {
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
        ) : raport ? (
          <div>
            {raport.jarltech && (
              <div className="text-green-500">
                Jarltech: {raport.jarltech_count} cen
              </div>
            )}
            {raport.ingram_micro_24 && (
              <div className="text-green-500">
                Ingram Micro 24: {raport.ingram_micro_24_count} cen
              </div>
            )}
            {raport.koncept_l && (
              <div className="text-green-500">
                Koncept L: {raport.koncept_l_count} cen
              </div>
            )}
            {!raport.jarltech &&
              !raport.ingram_micro_24 &&
              !raport.koncept_l && (
                <div className="red-500">Nie wygenerowano raportu</div>
              )}
          </div>
        ) : (
          <div>Nie wygenerowano raportu</div>
        )}
      </div>
      {!isLoading && (
        <Link
          href="/raport"
          className={`m-4 rounded-md p-4 text-white duration-150 ease-in ${
            raport_generated ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {raport_generated ? "Przeglądaj" : "Przeglądaj nieaktualny"}
        </Link>
      )}
    </div>
  );
};

export default RaportStatus;
