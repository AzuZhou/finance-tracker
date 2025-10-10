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
import Modal from "../ui/Modal";

type ModalState =
  | { type: "closed" }
  | { type: "filter" }
  | { type: "transaction"; transactionType: TransactionType };

const Transactions = () => {
  const { transactions } = useTransactions();
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
      <FiltersButton handleClick={() => setModalState({ type: "filter" })} />

      <Modal isOpen={modalState.type === "filter"} onClose={closeModal} title="Filter transactions">
        <FilteredTransactions transactions={transactions} onClose={closeModal} />
      </Modal>

      {transactions.length === 0 && (
        <Empty
          title="No transactions yet"
          message="Add your first income or expense to get started."
        />
      )}

      {transactions.length > 0 && <TransactionCards transactions={transactions} />}

      <div className="fixed right-0 bottom-4 left-0 flex justify-center gap-4">
        <FloatingButton
          handleClick={() => setModalState({ type: "transaction", transactionType: "income" })}
          label="Income"
          icon={PlusIcon}
        />

        <FloatingButton
          handleClick={() => setModalState({ type: "transaction", transactionType: "expense" })}
          label="Expense"
          icon={MinusIcon}
        />
      </div>

      <Modal
        isOpen={modalState.type === "transaction"}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {modalState.type === "transaction" && (
          <AddTransactionForm onClose={closeModal} type={modalState.transactionType} />
        )}
      </Modal>
    </div>
  );
};

export default Transactions;
