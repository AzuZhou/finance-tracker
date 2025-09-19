"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { generateTransactions } from "@/lib/utils/generateTransactions";
import { Transaction } from "@/lib/types";

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");

    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      const generatedTransactions = generateTransactions();
      setTransactions(generatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(generatedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => {
      const updated = [...prev, transaction];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    });
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
