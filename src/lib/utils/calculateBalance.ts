import { Transaction } from "../types";

const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
};

export default calculateBalance;
