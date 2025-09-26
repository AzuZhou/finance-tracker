import {
  MAXIMUM_TRANSACTION_ABSOLUTE,
  MAXIMUM_NEGATIVE_BALANCE,
  MINIMUM_TRANSACTION,
  MAXIMUM_BALANCE
} from "../contants";
import { Transaction } from "../types";

const canCreateTransaction = (transaction: Transaction, currentBalance: number) => {
  const { amount, type } = transaction;

  const isValidSign = (type === "income" && amount >= 0) || (type === "expense" && amount <= 0);

  const isValidAmount =
    Math.abs(amount) >= MINIMUM_TRANSACTION && Math.abs(amount) <= MAXIMUM_TRANSACTION_ABSOLUTE;

  const newBalance = currentBalance + amount;
  const isValidBalance = newBalance >= MAXIMUM_NEGATIVE_BALANCE && newBalance <= MAXIMUM_BALANCE;

  return isValidSign && isValidAmount && isValidBalance;
};

export default canCreateTransaction;
