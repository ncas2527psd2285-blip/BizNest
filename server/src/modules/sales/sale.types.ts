export interface CreateSaleItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateSaleInput {
  customerId: string;
  items: CreateSaleItemInput[];
  notes?: string;
}

export interface UpdateSaleInput {
  notes?: string;
}