"use client";

import { Transaction } from "@/lib/types";
import { getDateLabel } from "@/lib/utils/getDateLabel";

import TransactionCard from "./TransactionCard";

const TransactionCards = ({ transactions }: { transactions: Transaction[] }) => {
  const groupedTransactions = transactions.reduce(
    (acc, transaction) => {
      const dateKey = transaction.date.split("T")[0];
      return { ...acc, [dateKey]: [...(acc[dateKey] || []), transaction] };
    },

    {} as Record<string, Transaction[]>
  );

  return (
    <div className="flex flex-col gap-3">
      {Object.keys(groupedTransactions).map((date) => {
        return (
          <div key={date} className="">
            <h2 className="mx-2 mb-1 text-sm font-bold">{getDateLabel(date)}</h2>

            <ul className="flex flex-col divide-y divide-[var(--secondary-color)]">
              {groupedTransactions[date].map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionCards;
