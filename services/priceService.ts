import axios from "axios";
import { ISearchOptions } from "types";

const buildRequestUrl = (productId: string, searchOptions: ISearchOptions) => {
  const url = `http://127.0.0.1:8000/price/${productId}`;
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
        "api-key": "API_ACCESS_KEY",
      },
    });
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      response = error.response;
    } else {
      throw error;
    }
  }
  return response;
};

export default fetchProductPrices;
