export type TransactionType = "income" | "expense";

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
  dateRange?: {
    from: Date;
    to: Date;
  };
  category?: string;
};
