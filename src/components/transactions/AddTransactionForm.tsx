"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";

import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Select from "@/components/ui/Select";
import { useTransactions } from "@/contexts/TransactionsContext";
import { CATEGORIES, MAXIMUM_TRANSACTION_ABSOLUTE } from "@/lib/contants";
import { TransactionType, CategoryType } from "@/lib/types";
import calculateBalance from "@/lib/utils/calculateBalance";
import canCreateTransaction from "@/lib/utils/canCreateTransaction";
import getOptions from "@/lib/utils/getOptions";
import validators from "@/lib/validators";

type FieldState = { value: string; error: string | null };
type FieldType = "category" | "amount" | "description";

const initial = {
  description: { value: "", error: null },
  amount: { value: "", error: null },
  category: { value: "", error: null }
};

const AddTransactionForm = ({ onClose, type }: { onClose: () => void; type: TransactionType }) => {
  const { transactions, addTransaction } = useTransactions();

  const [formState, setFormState] = useState<null | "submitting" | "failure" | "error">(null);

  const [fields, setFields] = useState<Record<string, FieldState>>(initial);

  const updateField = (fieldName: FieldType, newValue: string) => {
    setFields((prev) => {
      const prevField = prev[fieldName];

      const valueHasChanged = prevField.value !== newValue;

      const nextError = formState === "error" && valueHasChanged ? null : prevField.error;

      const nextField = { value: newValue, error: nextError };

      if (nextField.value === prevField.value && nextField.error === prevField.error) {
        return prev;
      }

      return { ...prev, [fieldName]: nextField };
    });
  };

  const getFieldsWithErrors = () => {
    let hasError = false;
    const newFields = { ...fields };

    const descriptionError = validators.description(fields.description.value);
    if (descriptionError !== null) {
      hasError = true;
      newFields.description = {
        ...fields.description,
        error: descriptionError
      };
    }

    const amountError = validators.amount(fields.amount.value);
    if (amountError !== null) {
      hasError = true;
      newFields.amount = { ...fields.amount, error: amountError };
    }

    const categoryError = validators.category(fields.category.value);
    if (categoryError !== null) {
      hasError = true;
      newFields.category = { ...fields.category, error: categoryError };
    }

    return hasError ? newFields : null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldsWithErrors = getFieldsWithErrors();

    if (fieldsWithErrors === null) {
      const newTransaction = {
        description: fields.description.value,
        amount:
          type === "expense" ? -parseFloat(fields.amount.value) : +parseFloat(fields.amount.value),
        type,
        category: fields.category.value !== null ? (fields.category.value as CategoryType) : "",
        id: faker.string.uuid(),
        date: new Date().toISOString().slice(0, 16)
      };
      const currentBalance = calculateBalance(transactions);

      if (canCreateTransaction(newTransaction, currentBalance)) {
        setFormState("submitting");
        addTransaction(newTransaction);

        setFields(initial);
        setFormState(null);
        onClose();
      } else {
        setFormState("failure");
      }
    } else {
      setFields(fieldsWithErrors);
      setFormState("error");
    }
  };

  return (
    <>
      {formState === "failure" && (
        <span className="mb-5 text-xs font-semibold text-[var(--error-color)]">
          An error was encountered. Plese try again.
        </span>
      )}

      <Form
        onSubmit={handleSubmit}
        onClose={onClose}
        submitLabel={`Create new ${type}`}
        cancelLabel="Cancel transaction"
        disabled={formState === "submitting" || formState === "failure"}
      >
        <FormInput
          label="Description"
          name="description"
          value={fields.description.value}
          placeholder="Describe your transaction"
          maxLength={30}
          onChange={(value) => updateField("description", value)}
          validate={(value) => /^[a-zA-Z0-9\s.,!?'-]*$/.test(value)}
          error={fields.description.error}
        />

        <FormInput
          label="Amount Due"
          name="amount"
          placeholder="00.00"
          value={fields.amount.value}
          onChange={(value) => updateField("amount", value)}
          validate={(value) => {
            return (
              /^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= MAXIMUM_TRANSACTION_ABSOLUTE
            );
          }}
          error={fields.amount.error}
        />

        <Select
          label="Category"
          name="category"
          value={fields.category.value}
          onChange={(value) => updateField("category", value)}
          groupedOptions={getOptions(CATEGORIES, type)}
          error={fields.category.error}
        />
      </Form>
    </>
  );
};

export default AddTransactionForm;
