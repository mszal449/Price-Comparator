import { IRaport } from "../components/home/RaportStatus";

export const fetchReportStatus = async (): Promise<IRaport> => {
  const url = process.env.API_URL;
  console.log(url);
  const response = await fetch(`${url}/raport/status`);
  const data = await response.json();
  return data as IRaport;
};
