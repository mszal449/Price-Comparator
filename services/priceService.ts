import axios, { AxiosError } from "axios";
import { ISearchOptions } from "types";

const buildRequestUrl = (productId: string, searchOptions: ISearchOptions) => {
  // console.log(`API URL: ${process.env.API_URL}`);
  // const api_url = "http://127.0.0.1:8000";
  const url = `https://price-comparator-api.vercel.app/price/${productId}`;

  const params = new URLSearchParams();
  params.append("preciseName", searchOptions.preciseName ? "true" : "false");
  params.append(
    "onlyAvailable",
    searchOptions.onlyAvailable ? "true" : "false",
  );
  params.append("page", searchOptions.page.toString());
  params.append("pageSize", searchOptions.pageSize.toString());

  const query = params.toString();
  return query ? `${url}?${query}` : url;
};

const fetchProductPrices = async (
  productId: string,
  searchOptions: ISearchOptions,
) => {
  const url = buildRequestUrl(productId, searchOptions);
  let response;
  try {
    response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.API_ACCESS_KEY,
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      return axiosError.response;
    } else {
      throw axiosError;
    }
  }
  return response;
};

export default fetchProductPrices;
