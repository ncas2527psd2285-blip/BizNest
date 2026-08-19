export interface CreateSupplierInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateSupplierInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  tags?: string[];
}