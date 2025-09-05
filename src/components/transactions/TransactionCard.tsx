import { Transaction } from "@/lib/types";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <li className="flex justify-between items-center p-4 gap-2">
    <div className="flex flex-col justify-center items-left">
      <p className="text-lg line-clamp-1">{transaction.title}</p>
      <span>{transaction.category}</span>
    </div>

    <span className="text-lg whitespace-nowrap">{transaction.amount} €</span>
  </li>
);

export default TransactionCard;
