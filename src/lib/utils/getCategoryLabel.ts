import { CategoryType, TransactionType } from "../types";
import { CATEGORIES } from "../contants";

const getCategoryLabel = (type: TransactionType, value: CategoryType) =>
  CATEGORIES[type].find((category) => category.value === value)?.label ?? value;

export default getCategoryLabel;
