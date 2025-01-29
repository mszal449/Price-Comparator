export interface IProductPrices {
  product_id: string;
  product_name: string;
  prices: {
    id: number;
    shop_id: number;
    shop_name: string;
    shop_description: string;
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

export interface IReportFilters {
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

  description?: string;
}

export interface IUser {
  id: number;
  email: string;
  role: string;
}

export interface IShop {
  id: string;
  name: string;
  url: string;
}

export interface FetchError extends Error {
  status?: number;
  response?: string;
}

export interface IShopReport {
  shop_id: string;
  price_count: number;
  success: boolean;
  generated_at: string;
  created_at: string;
}

export interface IReports {
  reports: Array<{
    shop: IShop;
    report: IShopReport | null;
  }>;
}
