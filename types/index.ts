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

export interface IProductPricesResponse {
  totalCount: number;
  products: IProductPrices[];
}

export interface IRaportFilters {
  productId?: string;
  minStock?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export interface ISearchOptions {
  preciseName: boolean;
  onlyAvailable: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface IUser {
  id: number;
  email: string;
  role: string;
}
