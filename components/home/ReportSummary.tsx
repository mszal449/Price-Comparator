import React from "react";
import { IReports } from "types";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const ReportSummary = ({ report }: { report: IReports }) => {
  return (
    <div className="mx-auto max-w-[60%] p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800" key="header">
            <th className="border-b border-gray-700 p-3 text-start font-normal">
              Sklep
            </th>
            <th className="border-b border-gray-700 p-3 text-center font-normal">
              Liczba cen
            </th>
            <th className="border-b border-gray-700 p-3 text-center font-normal">
              Status
            </th>
            <th className="border-b border-gray-700 p-3 text-start font-normal">
              Aktualizacja
            </th>
          </tr>
        </thead>
        <tbody>
          {report.reports.map((item, index) => (
            <tr
              key={`${item.shop.id}-${index}`}
              className="border-b border-gray-800 bg-gray-900 transition-colors hover:bg-gray-700/10"
            >
              <td className="p-3 text-start">{item.shop.name}</td>
              <td className="p-3 text-center">
                {item.report?.price_count || 0}
              </td>
              <td className="flex justify-around p-3">
                {item.report?.success ? (
                  <AiOutlineCheck color="green" className="font-bold" />
                ) : (
                  <AiOutlineClose color="red" />
                )}
              </td>
              <td
                className={`p-3 text-start ${!item.report?.success ? "text-ted-500" : ""}`}
              >
                {item.report?.generated_at
                  ? new Date(item.report.generated_at).toLocaleString()
                  : "Brak danych"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportSummary;
