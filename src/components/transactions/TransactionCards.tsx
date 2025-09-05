"use client";

import TransactionCard from "./TransactionCard";

import { useTransactions } from "@/contexts/TransactionsContext";

const TransactionCards = () => {
  const { transactions } = useTransactions();

  return (
    <ul className="grid grid-cols-1 gap-2 divide-y  divide-gray-100">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
};

export default TransactionCards;
