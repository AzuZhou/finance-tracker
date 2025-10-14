"use client";

import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import { useTransactions } from "@/contexts/TransactionsContext";
import { TransactionType } from "@/lib/types";

import AddTransactionForm from "./AddTransactionForm";
import FilteredTransactions from "./FilteredTransactions";
import FiltersButton from "./FiltersButton";
import TransactionCards from "./TransactionCards";
import Empty from "../ui/Empty";
import FloatingButton from "../ui/FloatingButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

type ModalState =
  | { type: "closed" }
  | { type: "filter" }
  | { type: "transaction"; transactionType: TransactionType };

const Transactions = () => {
  const { transactions, isLoading } = useTransactions();
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });

  const closeModal = () => {
    setModalState({ type: "closed" });
  };

  const getModalTitle = () => {
    if (modalState.type !== "transaction") return "";
    return modalState.transactionType === "income" ? "Add Income" : "Add Expense";
  };

  return (
    <div className="w-full sm:max-w-3xl">
      <FiltersButton handleClick={() => setModalState({ type: "filter" })} disabled={isLoading} />

      <Modal isOpen={modalState.type === "filter"} onClose={closeModal} title="Filter transactions">
        <FilteredTransactions
          isLoading={isLoading}
          transactions={transactions}
          onClose={closeModal}
        />
      </Modal>

      {transactions.length === 0 && !isLoading && (
        <Empty
          title="No transactions yet"
          message="Add your first income or expense to get started."
        />
      )}

      {isLoading && <LoadingSpinner gap="gap-6" />}

      {transactions.length > 0 && !isLoading && <TransactionCards transactions={transactions} />}

      <div className="fixed right-0 bottom-4 left-0 flex items-center justify-center gap-4">
        <FloatingButton
          disabled={isLoading}
          handleClick={() => setModalState({ type: "transaction", transactionType: "income" })}
          label="Income"
          icon={PlusIcon}
        />

        <FloatingButton
          disabled={isLoading}
          handleClick={() => setModalState({ type: "transaction", transactionType: "expense" })}
          label="Expense"
          icon={MinusIcon}
        />
      </div>

      {modalState.type === "transaction" && (
        <Modal
          isOpen={modalState.type === "transaction"}
          onClose={closeModal}
          title={getModalTitle()}
        >
          <AddTransactionForm onClose={closeModal} type={modalState.transactionType} />
        </Modal>
      )}
    </div>
  );
};

export default Transactions;
