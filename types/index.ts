export interface IProductPrices {
  product_id: string;
  product_name: string;
  prices: {
    id: number;
    shop_id: number;
    shop_name: string;
    currency: string;
    updated_at: string;
    product_id: string;
    price: number;
    price_in_pln: number;
    stock: number;
  }[];
}
