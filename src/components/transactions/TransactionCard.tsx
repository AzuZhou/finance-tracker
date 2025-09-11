import { Transaction } from "@/lib/types";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <li className="flex items-center justify-between gap-6 p-2">
    <div className="items-left flex flex-col justify-center">
      <p className="line-clamp-1 text-sm">{transaction.description}</p>
      <span className="text-xs">{transaction.category}</span>
    </div>

    <span className="text-base whitespace-nowrap">
      {transaction.amount.toFixed(2)} €
    </span>
  </li>
);

export default TransactionCard;
