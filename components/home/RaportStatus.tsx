"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IRaport } from "types";

const RaportStatus = () => {
  const [raport, setRaport] = useState<IRaport | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [raport_generated, setRaportGenerated] = useState<boolean>(false);

  useEffect(() => {
    const getReportStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/raport/status");
        const raport = (await response.json()).raport as IRaport;

        if (!raport) {
          setRaport(null);
          setRaportGenerated(false);
          return;
        }

        const today = new Date().toISOString().split("T")[0];
        const reportDate = new Date(raport.created_at)
          .toISOString()
          .split("T")[0];

        const isGeneratedToday = reportDate ? today === reportDate : false;

        setRaport(raport);
        setRaportGenerated(isGeneratedToday);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    getReportStatus();
  }, []);

  return (
    <div>
      <div className="pb-6 text-2xl">
        {isLoading ? (
          <span>Ładowanie...</span>
        ) : raport ? (
          <div>
            <div>
              Raport wygenerowano:{" "}
              {new Date(raport.created_at).toLocaleDateString()}
            </div>
            <div
              className={raport.jarltech ? "text-green-500" : "text-red-500"}
            >
              Jarltech: {raport.jarltech_count} cen
            </div>
            <div
              className={
                raport.ingram_micro_24 ? "text-green-500" : "text-red-500"
              }
            >
              Ingram Micro 24: {raport.ingram_micro_24_count} cen
            </div>
            <div
              className={raport.koncept_l ? "text-green-500" : "text-red-500"}
            >
              Koncept L: {raport.koncept_l_count} cen
            </div>
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
      <div className="pt-10 text-base">
        Uwaga! Jeżeli nazwa sklepu jest czerwona, ceny mogą być nieaktualne.
      </div>
      <div className="text-base">Zwróć uwagę na datę dodania ceny.</div>
    </div>
  );
};

export default RaportStatus;
