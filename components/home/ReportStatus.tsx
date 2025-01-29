"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IReports } from "types";
import ReportSummary from "./ReportSummary";

const ReportStatus = () => {
  const [report, setReport] = useState<IReports | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getReportStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/report/status");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error("Failed to fetch report:", error);
        setReport(null);
      } finally {
        setIsLoading(false);
      }
    };

    getReportStatus();
  }, []);

  return (
    <div>
      <div className="pb-6 text-2xl">
        {isLoading ? (
          <span>Ładowanie...</span>
        ) : report ? (
          <div>
            <ReportSummary report={report} />
          </div>
        ) : (
          <div>Nie wygenerowano raportu</div>
        )}
      </div>
      {!isLoading && (
        <Link
          href="/report"
          className="m-4 rounded-md bg-green-500 p-4 text-white duration-150 ease-in hover:bg-green-600"
        >
          Przeglądaj ceny
        </Link>
      )}
      <div className="pt-10 text-base">
        Uwaga! W sytuacji gdy ceny z danego dnia są niedostępne, wyświetlane
        będą ostatnie dostępne ceny.
      </div>
      <div className="text-base">Zwróć uwagę na datę dodania ceny.</div>
    </div>
  );
};

export default ReportStatus;
