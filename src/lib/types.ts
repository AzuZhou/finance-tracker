import { CATEGORIES } from "./contants";

export type TransactionType = "income" | "expense";

export type DateRangeType = {
  from?: Date | null;
  to?: Date | null;
};

export type CategoryType =
  | (typeof CATEGORIES.income)[number]["value"]
  | (typeof CATEGORIES.expense)[number]["value"];

export type CategoriesType = typeof CATEGORIES;

export type OptionType = { value: string; label: string };
export type GroupedOptions = { groupLabel?: string; options: OptionType[] }[];

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: CategoryType;
  type: TransactionType;
};

export type TransactionFilters = {
  description?: string;
  type?: TransactionType | null;
  dateRange?: DateRangeType;
  category?: CategoryType | null;
};

export type InputField = { value: string; error: string | null };

export type SelectField = { value: CategoryType | null; error: string | null };
