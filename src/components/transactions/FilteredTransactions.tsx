"use client";

import { useMemo, useState } from "react";

import { Transaction, TransactionFilters } from "@/lib/types";
import getNormalizedDateRange from "@/lib/utils/getNormalizedDateRange";

import FilterTransactionsForm from "./FilterTransactionsForm";
import TransactionCards from "./TransactionCards";
import Empty from "../ui/Empty";
import LoadingSpinner from "../ui/LoadingSpinner";

const FilteredTransactions = ({
  transactions,
  onClose,
  isLoading
}: {
  transactions: Transaction[];
  onClose: () => void;
  isLoading: boolean;
}) => {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const filteredTransactions = useMemo(() => {
    const { from, to } = getNormalizedDateRange(filters.dateRange ?? {});

    return transactions.filter((transaction) => {
      const matchesDescription =
        !filters.description ||
        transaction.description.toLowerCase().includes(filters.description.toLowerCase());

      const matchesCategory = !filters.category || transaction.category === filters.category;

      const transactionDate = new Date(transaction.date);
      const matchesDateRange = (!from || transactionDate >= from) && (!to || transactionDate <= to);

      const matchesType = !filters.type || filters.type === transaction.type;

      return matchesDescription && matchesCategory && matchesDateRange && matchesType;
    });
  }, [filters, transactions]);

  return (
    <>
      <FilterTransactionsForm setFilters={setFilters} onClose={onClose} />

      {Object.keys(filters).length > 0 && filteredTransactions.length === 0 && !isLoading && (
        <Empty
          title="No results found"
          message="Try adjusting the filters."
          marginTop="mt-12"
          gap="gap-2"
        />
      )}

      {isLoading && <LoadingSpinner marginTop="mt-10" />}

      {!isLoading && (
        <div className="mt-5 sm:overflow-y-auto">
          {Object.keys(filters).length > 0 && filteredTransactions.length > 0 && (
            <TransactionCards transactions={filteredTransactions} />
          )}
        </div>
      )}
    </>
  );
};

export default FilteredTransactions;
