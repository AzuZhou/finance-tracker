"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { generateTransactions } from "@/lib/utils/generateTransactions";
import { Transaction } from "@/lib/types";

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

const getSortedTransactions = (transactions: Transaction[]) => {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
};

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");

    if (!storedTransactions) {
      const generatedTransactions = generateTransactions();
      const sortedTransactions = getSortedTransactions(generatedTransactions);
      setTransactions(sortedTransactions);
    } else {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => getSortedTransactions([...prev, transaction]));
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) throw new Error("useTransactions must be used inside TransactionsProvider");

  return context;
};

export { TransactionsProvider, useTransactions };
