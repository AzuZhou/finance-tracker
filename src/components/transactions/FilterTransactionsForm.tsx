"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import Form from "@/components/ui/Form";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { TransactionFilters, DateRangeType } from "@/lib/types";
import { CATEGORIES } from "@/lib/contants";

const FilterTransactionsForm = ({
  setFilters,
  onClose
}: {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [dateRange, setDateRange] = useState<DateRangeType>({
    from: null,
    to: null
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilters({ description, category, dateRange });
  };

  return (
    <Form onSubmit={handleSubmit} onClose={onClose} submitLabel="Filter">
      <FormInput
        label="Description"
        name="description"
        value={description}
        placeholder="Describe your transaction"
        maxLength={30}
        setValue={setDescription}
        validate={(value) => /^[a-zA-Z0-9\s.,!?'-]*$/.test(value)}
      />

      <Select
        label="Category"
        name="category"
        value={category}
        setValue={setCategory}
        defaultOption="Select a category"
        options={CATEGORIES["expense"]}
      />

      <DatePicker range={dateRange} onRangeChange={setDateRange} />
    </Form>
  );
};

export default FilterTransactionsForm;
