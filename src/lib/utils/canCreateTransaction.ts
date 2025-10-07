import { MAXIMUM_NEGATIVE_BALANCE, MAXIMUM_BALANCE } from "../contants";
import { Transaction } from "../types";
import isValidAbsolute from "./isValidAbsolute";

const canCreateTransaction = (transaction: Transaction, currentBalance: number) => {
  const { amount, type } = transaction;

  const isValidSign = (type === "income" && amount > 0) || (type === "expense" && amount <= 0);

  const isValidAmount = isValidAbsolute(amount);

  const newBalance = currentBalance + amount;
  const isValidBalance = newBalance >= MAXIMUM_NEGATIVE_BALANCE && newBalance <= MAXIMUM_BALANCE;

  return isValidSign && isValidAmount && isValidBalance;
};

export default canCreateTransaction;
