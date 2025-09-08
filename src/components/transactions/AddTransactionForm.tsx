"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";

import { categories } from "@/lib/generateTransactions";

import Form from "@/components/ui/Form";

import { useTransactions } from "@/contexts/TransactionsContext";

// TODO: handle errors here as well

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

    console.log("submit: ", amount, description, category);
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
      <>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="transaction-description"
          name="description"
          placeholder="Describe your transaction"
          value={description}
          onChange={(e) => {
            const { value } = e.target;
            if (/^[a-zA-Z0-9\s.,!?'-]*$/.test(value) && value.length <= 30) {
              setDescription(value);
            }
          }}
        />
      </>

      <>
        <label htmlFor="amount">Amount due</label>
        <input
          type="text"
          id="transaction-amount"
          name="amount"
          placeholder="0.00"
          value={amount}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              setAmount(value);
            }
          }}
        />
      </>

      <>
        <label htmlFor="category">Category</label>
        <select
          id="transaction-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option key="default-category" value="">
            Select a category
          </option>
          {categories[type].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </>

      <button type="submit">Add</button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </Form>
  );
};

export default AddTransactionForm;
