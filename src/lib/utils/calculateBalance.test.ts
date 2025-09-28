import { describe, test, expect } from "vitest";

import calculateBalance from "./calculateBalance";
import { Transaction } from "../types";

describe("calculateBalance", () => {
  test("should calculate balance from transaction amounts", () => {
    const transactions1 = [{ amount: 100 }] as Transaction[];
    expect(calculateBalance(transactions1)).toBe(100);

    const transactions2 = [{ amount: 100 }, { amount: -50 }, { amount: 25 }] as Transaction[];
    expect(calculateBalance(transactions2)).toBe(75);

    const transactions3 = [{ amount: 1 }, { amount: -25 }] as Transaction[];
    expect(calculateBalance(transactions3)).toBe(-24);
  });
});
