"use client";

import { useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import { useTransactions } from "@/contexts/TransactionsContext";
import FloatingButton from "../ui/FloatingButton";
import Modal from "../ui/Modal";
import AddTransactionForm from "./AddTransactionForm";
import TransactionCards from "./TransactionCards";
import FiltersButton from "./FiltersButton";
import FilteredTransactions from "./FilteredTransactions";
import { TransactionType } from "@/lib/types";
import Empty from "../ui/Empty";

const Transactions = () => {
  const { transactions } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleTransaction = (transactionType: TransactionType) => {
    setTransactionType(transactionType);
  };

  const closeModal = () => {
    setTransactionType(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (transactionType) openModal();
  }, [transactionType]);

  return (
    <div className="w-full sm:max-w-3xl">
      <FiltersButton handleClick={openModal} />

      {!transactionType && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Filter transactions">
          <FilteredTransactions transactions={transactions} onClose={closeModal} />
        </Modal>
      )}

      {transactions.length === 0 && (
        <Empty
          title="No transactions yet"
          message="Add your first income or expense to get started."
        />
      )}

      {transactions.length > 0 && <TransactionCards transactions={transactions} />}

      <div className="fixed right-0 bottom-4 left-0 flex justify-center gap-4">
        <FloatingButton
          handleClick={() => handleTransaction("income")}
          label="Income"
          icon={PlusIcon}
        />

        <FloatingButton
          handleClick={() => handleTransaction("expense")}
          label="Expense"
          icon={MinusIcon}
        />
      </div>

      {transactionType && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={transactionType === "income" ? "Add Income" : "Add Expense"}
        >
          <AddTransactionForm onClose={closeModal} type={transactionType} />
        </Modal>
      )}
    </div>
  );
};

export default Transactions;
