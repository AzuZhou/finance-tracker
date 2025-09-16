"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";

import { CATEGORIES } from "@/lib/contants";

import Form from "@/components/ui/Form";
import Select from "@/components/ui/Select";
import FormInput from "@/components/ui/FormInput";

import { useTransactions } from "@/contexts/TransactionsContext";

const AddTransactionForm = ({
  onClose,
  type,
}: {
  onClose: () => void;
  type: "income" | "expense";
}) => {
  const { addTransaction } = useTransactions();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const title = type === "income" ? "Add Income" : "Add Expense";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !description || !category) return;

    addTransaction({
      description,
      amount: type === "expense" ? -parseFloat(amount) : +parseFloat(amount),
      type,
      category,
      id: faker.string.uuid(),
      date: new Date().toISOString().slice(0, 16),
    });

    onClose();
  };

  return (
    <Form onSubmit={handleSubmit} title={title}>
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
        options={CATEGORIES[type]}
      />

      <>
        <button type="submit">Add</button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </>
    </Form>
  );
};

export default AddTransactionForm;
