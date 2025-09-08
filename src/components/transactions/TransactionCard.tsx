import { Transaction } from "@/lib/types";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <li className="flex items-center justify-between gap-2 p-4">
    <div className="items-left flex flex-col justify-center">
      <p className="line-clamp-1 text-lg">{transaction.description}</p>
      <span>{transaction.category}</span>
    </div>

    <span className="text-lg whitespace-nowrap">
      {transaction.amount.toFixed(2)} €
    </span>
  </li>
);

export default TransactionCard;
