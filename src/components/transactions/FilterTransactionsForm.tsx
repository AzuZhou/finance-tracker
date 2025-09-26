"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/ui/FormInput";
import Form from "@/components/ui/Form";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import Radio from "@/components/ui/Radio";
import { TransactionFilters, DateRangeType, TransactionType, CategoryType } from "@/lib/types";
import { CATEGORIES } from "@/lib/contants";
import getOptions from "@/lib/utils/getOptions";

const FilterTransactionsForm = ({
  setFilters,
  onClose
}: {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [type, setType] = useState<TransactionType | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    from: null,
    to: null
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilters({ description, category, dateRange, type });
  };

  useEffect(() => {
    setCategory(null);
  }, [type]);

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

      <Radio
        options={["expense", "income"]}
        setSelected={setType}
        selected={type}
        name="type"
        label="Transaction type"
      />

      <Select
        disabled={type === null}
        label="Category"
        name="category"
        value={category}
        setValue={setCategory}
        defaultOption="Select a category"
        groupedOptions={getOptions(CATEGORIES, type)}
      />

      <DatePicker range={dateRange} onRangeChange={setDateRange} />
    </Form>
  );
};

export default FilterTransactionsForm;
