import { faker } from "@faker-js/faker";
import { Transaction, TransactionType } from "../types";
import { CATEGORIES } from "../contants";

import canCreateTransaction from "./canCreateTransaction";

const generateMockTransaction = () => {
  const isExpense = faker.datatype.boolean(0.85);
  const type: TransactionType = isExpense ? "expense" : "income";
  const category = faker.helpers.arrayElement(CATEGORIES[type].map((category) => category.value));
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
};

const generateTransactions = (count: number = 200): Transaction[] => {
  const today = new Date();
  today.setDate(today.getDate() - 90);

  const firstTransaction = {
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    type: "income" as TransactionType,
    amount: parseFloat(faker.finance.amount({ min: 500, max: 5000, dec: 2 })),
    category: faker.helpers.arrayElement(CATEGORIES["income"].map((c) => c.value)),
    date: today.toISOString().slice(0, 16)
  };

  let initialTransactions: Transaction[] = [firstTransaction];

  for (let i = 1; i < count; i++) {
    const newTransaction = generateMockTransaction();

    if (canCreateTransaction(newTransaction, initialTransactions)) {
      initialTransactions.push(newTransaction);
    } else {
      initialTransactions.push({
        ...newTransaction,
        type: "income",
        amount: parseFloat(faker.finance.amount({ min: 500, max: 5000, dec: 2 })),
        category: faker.helpers.arrayElement(CATEGORIES["income"].map((c) => c.value))
      });
    }
  }

  return initialTransactions;
};

export default generateTransactions;
