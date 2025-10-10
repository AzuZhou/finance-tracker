"use client";

import { useEffect, useState, useMemo } from "react";

import DatePicker from "@/components/ui/DatePicker";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import { CATEGORIES } from "@/lib/contants";
import { TransactionFilters, DateRangeType, TransactionType, CategoryType } from "@/lib/types";
import getOptions from "@/lib/utils/getOptions";

const categoryDefault = { value: "", label: "Select a category" };

const FilterTransactionsForm = ({
  setFilters,
  onClose
}: {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CategoryType | typeof categoryDefault.value>(
    categoryDefault.value
  );
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
    setCategory(categoryDefault.value);
  }, [type]);

  const groupedOptions = useMemo(() => getOptions(CATEGORIES, type), [type]);

  return (
    <Form onSubmit={handleSubmit} onClose={onClose} submitLabel="Filter">
      <FormInput
        label="Description"
        name="description"
        value={description}
        placeholder="Describe your transaction"
        maxLength={30}
        onChange={setDescription}
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
        onChange={setCategory}
        defaultLabel={categoryDefault.label}
        defaultValue={categoryDefault.value}
        groupedOptions={groupedOptions}
      />

      <DatePicker range={dateRange} onRangeChange={setDateRange} />
    </Form>
  );
};

export default FilterTransactionsForm;
