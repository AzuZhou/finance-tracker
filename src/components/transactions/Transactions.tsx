"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import FloatingButton from "../ui/FloatingButton";
import Modal from "../ui/Modal";
import AddTransactionForm from "./AddTransactionForm";
import TransactionCards from "./TransactionCards";

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");

  const openModal = (type: "income" | "expense") => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <TransactionCards />

      <div className="fixed bottom-4 flex gap-4">
        <FloatingButton handleClick={() => openModal("income")} label="Income" icon={PlusIcon} />

        <FloatingButton handleClick={() => openModal("expense")} label="Expense" icon={MinusIcon} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTransactionForm onClose={() => setIsModalOpen(false)} type={transactionType} />
      </Modal>
    </>
  );
};

export default Transactions;
