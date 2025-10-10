"use client";

import { faker } from "@faker-js/faker";
import { useState, useCallback, useMemo } from "react";

import { useTransactions } from "@/contexts/TransactionsContext";
import { TransactionType, CategoryType } from "@/lib/types";
import calculateBalance from "@/lib/utils/calculateBalance";
import canCreateTransaction from "@/lib/utils/canCreateTransaction";
import validators from "@/lib/validators";

type FieldState = { value: string; error: string | null };
type FieldType = "category" | "amount" | "description";

const initial = {
  description: { value: "", error: null },
  amount: { value: "", error: null },
  category: { value: "", error: null }
};

const useTrasanctionForm = (type: TransactionType, onClose: () => void) => {
  const { transactions, addTransaction } = useTransactions();

  const [formState, setFormState] = useState<null | "submitting" | "failure" | "error">(null);
  const [fields, setFields] = useState<Record<FieldType, FieldState>>(initial);

  const updateField = useCallback((fieldName: FieldType, newValue: string) => {
    setFields((prev) => {
      const prevField = prev[fieldName];

      const valueHasChanged = prevField.value !== newValue;

      const nextError =
        prevField.error && valueHasChanged && formState === "error" ? null : prevField.error;

      const nextField = { value: newValue, error: nextError };

      if (nextField.value === prevField.value && nextField.error === prevField.error) {
        return prev;
      }

      return { ...prev, [fieldName]: nextField };
    });
  }, []);

  const getFieldsWithErrors = () => {
    let hasError = false;
    const newFields = { ...fields };

    (Object.keys(fields) as FieldType[]).forEach((key) => {
      const error = validators[key](fields[key].value);
      if (error !== null) {
        hasError = true;
        newFields[key] = { ...fields[key], error };
      }
    });

    return hasError ? newFields : null;
  };

  const fieldHandlers = useMemo(
    () => ({
      description: (value: string) => updateField("description", value),
      amount: (value: string) => updateField("amount", value),
      category: (value: string) => updateField("category", value)
    }),
    [updateField]
  );

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

  return { handleSubmit, fields, formState, fieldHandlers };
};

export default useTrasanctionForm;
