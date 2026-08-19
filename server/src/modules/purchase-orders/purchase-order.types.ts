export interface CreatePurchaseOrderItemInput {
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface CreatePurchaseOrderInput {
  supplierId: string;
  items: CreatePurchaseOrderItemInput[];
  notes?: string;
}

export interface UpdatePurchaseOrderInput {
  notes?: string;
}