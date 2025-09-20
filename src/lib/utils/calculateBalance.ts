import { Transaction } from "../types";

const calculateBalance = (transactions: Transaction[]) => {
  if (!transactions.length) return null;

  if (transactions.length === 1) return transactions[0].amount;

  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
};

export default calculateBalance;
