import { CategoriesType, GroupedOptions, TransactionType } from "../types";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getOptions = (options: CategoriesType, type: TransactionType | null): GroupedOptions => {
  const types: TransactionType[] = type === null ? ["income", "expense"] : [type];

  return types.map((type) => ({
    groupLabel: capitalize(type),
    options: options[type]
  }));
};

export default getOptions;
