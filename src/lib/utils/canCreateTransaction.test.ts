import { describe, test, expect } from "vitest";

import canCreateTransaction from "./canCreateTransaction";
import { Transaction } from "../types";

describe("canCreateTransaction", () => {
  test("should make sure the sign is the correct one per transaction type", () => {
    const currentBalance = 2000;

    const invalidExpense = { amount: 100, type: "expense" } as Transaction;
    expect(canCreateTransaction(invalidExpense, currentBalance)).toBe(false);

    const validExpense = { amount: -100, type: "expense" } as Transaction;
    expect(canCreateTransaction(validExpense, currentBalance)).toBe(true);

    const invalidIncome = { amount: -1500, type: "income" } as Transaction;
    expect(canCreateTransaction(invalidIncome, currentBalance)).toBe(false);

    const validIncome = { amount: 1500, type: "income" } as Transaction;
    expect(canCreateTransaction(validIncome, currentBalance)).toBe(true);
  });

  test("should make sure the transaction amount between the bounds", () => {
    const currentBalance = 15000;

    const invalidExpense = { amount: -5001, type: "expense" } as Transaction;
    expect(canCreateTransaction(invalidExpense, currentBalance)).toBe(false);

    const validExpense = { amount: 0, type: "expense" } as Transaction;
    expect(canCreateTransaction(validExpense, currentBalance)).toBe(true);

    const invalidIncome = { amount: 6000, type: "income" } as Transaction;
    expect(canCreateTransaction(invalidIncome, currentBalance)).toBe(false);

    const validIncome = { amount: 5000, type: "income" } as Transaction;
    expect(canCreateTransaction(validIncome, currentBalance)).toBe(true);
  });

  test("should make sure the remaining balance would be withing the bounds", () => {
    const currentBalance1 = 200;

    const invalidExpense = { amount: -301, type: "expense" } as Transaction;
    expect(canCreateTransaction(invalidExpense, currentBalance1)).toBe(false);

    const validExpense = { amount: -150, type: "expense" } as Transaction;
    expect(canCreateTransaction(validExpense, currentBalance1)).toBe(true);

    const currentBalance2 = 99999999;

    const invalidIncome = { amount: 2000, type: "income" } as Transaction;
    expect(canCreateTransaction(invalidIncome, currentBalance2)).toBe(false);

    const validIncome = { amount: 1, type: "income" } as Transaction;
    expect(canCreateTransaction(validIncome, currentBalance2)).toBe(true);
  });

  test("should allow transactions when all validation rules pass", () => {
    const currentBalance = 5000;

    const validIncome = { amount: 500, type: "income" } as Transaction;
    expect(canCreateTransaction(validIncome, currentBalance)).toBe(true);

    const validExpense = { amount: -100, type: "expense" } as Transaction;
    expect(canCreateTransaction(validExpense, currentBalance)).toBe(true);

    const invalidIncome = { amount: -6000, type: "income" } as Transaction;
    expect(canCreateTransaction(invalidIncome, currentBalance)).toBe(false);

    const invalidExpense = { amount: 100000000, type: "expense" } as Transaction;
    expect(canCreateTransaction(invalidExpense, currentBalance)).toBe(false);
  });
});
