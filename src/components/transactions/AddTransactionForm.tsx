"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";

import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Select from "@/components/ui/Select";
import { useTransactions } from "@/contexts/TransactionsContext";
import { CATEGORIES } from "@/lib/contants";
import { TransactionType, CategoryType } from "@/lib/types";
import calculateBalance from "@/lib/utils/calculateBalance";
import canCreateTransaction from "@/lib/utils/canCreateTransaction";
import getOptions from "@/lib/utils/getOptions";

const AddTransactionForm = ({ onClose, type }: { onClose: () => void; type: TransactionType }) => {
  const { transactions, addTransaction } = useTransactions();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryType | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !description || !category) return;

    const newTransaction = {
      description,
      amount: type === "expense" ? -parseFloat(amount) : +parseFloat(amount),
      type,
      category,
      id: faker.string.uuid(),
      date: new Date().toISOString().slice(0, 16)
    };
    const currentBalance = calculateBalance(transactions);

    if (canCreateTransaction(newTransaction, currentBalance)) {
      addTransaction(newTransaction);
    }

    onClose();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={onClose}
      submitLabel={`Create new ${type}`}
      cancelLabel="Cancel transaction"
    >
      <FormInput
        label="Description"
        name="description"
        value={description}
        placeholder="Describe your transaction"
        maxLength={30}
        setValue={setDescription}
        validate={(value) => /^[a-zA-Z0-9\s.,!?'-]*$/.test(value)}
      />

      <FormInput
        label="Amount Due"
        name="amount"
        placeholder="00.00"
        value={amount}
        setValue={setAmount}
        validate={(value) => /^\d*\.?\d{0,2}$/.test(value)}
      />

      <Select
        label="Category"
        name="category"
        value={category}
        setValue={setCategory}
        defaultOption="Select a category"
        groupedOptions={getOptions(CATEGORIES, type)}
        isMandatory
      />
    </Form>
  );
};

export default AddTransactionForm;
