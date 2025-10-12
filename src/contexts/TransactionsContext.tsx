"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { Transaction } from "@/lib/types";
import generateTransactions from "@/lib/utils/generateTransactions";

type TransactionsContextType = {
  isLoading: boolean;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

const getSortedTransactions = (transactions: Transaction[]) => {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
};

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedTransactions = localStorage.getItem("transactions");

      if (!storedTransactions) {
        try {
          const response = await fetch("/api/transactions");
          if (!response.ok) throw new Error("Failed to fetch transactions");

          const { transactions } = await response.json();
          const sortedTransactions = getSortedTransactions(transactions);

          setTransactions(sortedTransactions);
          localStorage.setItem("transactions", JSON.stringify(sortedTransactions));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTransactions(JSON.parse(storedTransactions));
        setIsLoading(false);
      }
    };

    fetchTransactions();
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
    <TransactionsContext.Provider value={{ transactions, addTransaction, isLoading }}>
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
