"use client";

import { useMemo, useCallback } from "react";

import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Select from "@/components/ui/Select";
import { CATEGORIES } from "@/lib/contants";
import useTransactionForm from "@/lib/hooks/useTransactionForm";
import { TransactionType } from "@/lib/types";
import getOptions from "@/lib/utils/getOptions";

const AddTransactionForm = ({ type, onClose }: { type: TransactionType; onClose: () => void }) => {
  const { fields, formState, fieldHandlers, handleSubmit } = useTransactionForm(type, onClose);

  const groupedOptions = useMemo(() => getOptions(CATEGORIES, type), [type]);

  const validateDescription = useCallback(
    (value: string) => /^[a-zA-Z0-9\s.,!?'-]*$/.test(value),
    []
  );

  const validateAmount = useCallback((value: string) => /^\d*\.?\d{0,2}$/.test(value), []);

  return (
    <>
      {formState === "failure" && (
        <span className="mb-5 text-xs font-semibold text-[var(--error-color)]">
          An error was encountered. Please try again.
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
          placeholder="Describe your transaction"
          maxLength={30}
          validate={validateDescription}
          value={fields.description.value}
          onChange={fieldHandlers.description}
          error={fields.description.error}
        />

        <FormInput
          label="Amount Due"
          name="amount"
          placeholder="00.00"
          validate={validateAmount}
          value={fields.amount.value}
          onChange={fieldHandlers.amount}
          error={fields.amount.error}
        />

        <Select
          label="Category"
          name="category"
          groupedOptions={groupedOptions}
          value={fields.category.value}
          onChange={fieldHandlers.category}
          error={fields.category.error}
          defaultLabel="Select a category"
        />
      </Form>
    </>
  );
};

export default AddTransactionForm;
