"use client";

import { useState } from "react";
import FloatingButton from "../ui/FloatingButton";
import Modal from "../ui/Modal";

import TransactionCards from "./TransactionCards";

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TransactionCards />

      <FloatingButton handleClick={() => setIsOpen(true)}>
        Add transaction
      </FloatingButton>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
        <form></form>
      </Modal>
    </>
  );
};

export default Transactions;
