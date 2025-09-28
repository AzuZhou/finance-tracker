import { CATEGORIES } from "../contants";
import { CategoryType, TransactionType } from "../types";

const getCategoryLabel = (type: TransactionType, value: CategoryType) =>
  CATEGORIES[type].find((category) => category.value === value)?.label ?? value;

export default getCategoryLabel;
