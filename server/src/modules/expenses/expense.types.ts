export interface CreateExpenseInput {
  title: string;
  category: string;
  amount: number;
  description?: string;
  expenseDate?: string;
}

export interface UpdateExpenseInput {
  title?: string;
  category?: string;
  amount?: number;
  description?: string;
  expenseDate?: string;
  status?: "PENDING" | "PAID" | "CANCELLED";
}