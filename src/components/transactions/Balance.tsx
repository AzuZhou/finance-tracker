"use client";

import { useTransactions } from "@/contexts/TransactionsContext";

import calculateBalance from "@/lib/utils/calculateBalance";

const Balance = () => {
  const { transactions } = useTransactions();

  return (
    <div className="text-center">
      <span className="text-xs">Total Balance</span>
      <p className="text-2xl text-[var(--primary-color)]">
        {calculateBalance(transactions).toFixed(2)} €
      </p>
    </div>
  );
};

export default Balance;
