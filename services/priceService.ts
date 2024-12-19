import axios from "axios";

const fetchProductPrices = async (productId: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/price/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      "api-key": "API_ACCESS_KEY",
    },
  });
  return response;
};

export default fetchProductPrices;
