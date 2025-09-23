export type TransactionType = "income" | "expense";

export type DateRangeType = {
  from: Date | null;
  to: Date | null;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
};

export type TransactionFilters = {
  description?: string;
  type?: TransactionType;
  dateRange?: DateRangeType;
  category?: string;
};
