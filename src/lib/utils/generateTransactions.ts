import { faker } from "@faker-js/faker";
import { Transaction } from "../types";
import { CATEGORIES } from "../contants";

export const generateTransactions = (count: number = 200): Transaction[] => {
  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(["income", "expense"] as const);
    const category = faker.helpers.arrayElement(CATEGORIES[type]);

    const isExpense = faker.datatype.boolean(0.9);
    const amount = isExpense
      ? -parseFloat(faker.finance.amount({ min: 5, max: 500, dec: 2 }))
      : parseFloat(faker.finance.amount({ min: 500, max: 5000, dec: 2 }));

    return {
      id: faker.string.uuid(),
      date: faker.date.recent({ days: 90 }).toISOString().slice(0, 16),
      description: faker.lorem.sentence(),
      amount,
      category,
      type
    };
  });
};
