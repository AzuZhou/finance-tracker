"use client";

import { useTransactions } from "@/contexts/TransactionsContext";

import calculateBalance from "@/lib/utils/calculateBalance";

const Balance = () => {
  const { transactions } = useTransactions();
  const balance = calculateBalance(transactions);

  return (
    <div className="text-center">
      <span className="text-xs">Total Balance</span>
      <p className="text-2xl text-[var(--primary-color)]">{balance.toFixed(2)} €</p>
    </div>
  );
};

export default Balance;
