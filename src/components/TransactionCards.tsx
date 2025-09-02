import TransactionCard from "./TransactionCard";

import { Transaction } from "../lib/generateTransactions";

const TransactionCards = ({
  transactions,
}: {
  transactions: Transaction[];
}) => (
  <div className="grid grid-cols-1 gap-2 divide-y  divide-gray-100">
    {transactions.map((transaction) => (
      <TransactionCard key={transaction.id} transaction={transaction} />
    ))}
  </div>
);

export default TransactionCards;
