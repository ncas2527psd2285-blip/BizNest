export interface CreateProductInput {
  name: string;
  sku: string;
  categoryId?: string;
  description?: string;
  price: number;
  cost: number;
  stock?: number;
  lowStockThreshold?: number;
  status?: "ACTIVE" | "INACTIVE";
}

export interface UpdateProductInput {
  name?: string;
  sku?: string;
  categoryId?: string;
  description?: string;
  price?: number;
  cost?: number;
  stock?: number;
  lowStockThreshold?: number;
  status?: "ACTIVE" | "INACTIVE";
}

export interface ProductQuery {
  search?: string;
  categoryId?: string;
  status?: "ACTIVE" | "INACTIVE";
  page: number;
  limit: number;
}