"use client";

import { useMemo, useState } from "react";

import FilterTransactionsForm from "./FilterTransactionsForm";
import { Transaction, TransactionFilters } from "@/lib/types";
import TransactionCards from "./TransactionCards";

const FilteredTransactions = ({
  transactions,
  onClose
}: {
  transactions: Transaction[];
  onClose: () => void;
}) => {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesDescription =
        !filters.description ||
        transaction.description.toLowerCase().includes(filters.description.toLowerCase());

      const matchesCategory = !filters.category || transaction.category === filters.category;

      const transactionDate = new Date(transaction.date);
      const matchesDateRange =
        (!filters.dateRange?.from || transactionDate >= filters.dateRange.from) &&
        (!filters.dateRange?.to || transactionDate <= filters.dateRange.to);

      const matchesType = !filters.type || filters.type === transaction.type;

      return matchesDescription && matchesCategory && matchesDateRange && matchesType;
    });
  }, [filters, transactions]);

  return (
    <>
      <FilterTransactionsForm setFilters={setFilters} onClose={onClose} />

      <div className="mt-5 sm:overflow-y-auto">
        {Object.keys(filters).length > 0 && filteredTransactions.length > 0 && (
          <TransactionCards transactions={filteredTransactions} />
        )}
      </div>
    </>
  );
};

export default FilteredTransactions;
