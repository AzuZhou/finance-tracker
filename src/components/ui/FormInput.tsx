"use client";

import { memo } from "react";

type FormInputType = {
  name: string;
  value: string | null;
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  validate?: (value: string) => boolean;
  maxLength?: number;
  error?: string | null;
  type?: string;
};

const FormInput = ({
  value,
  onChange,
  name,
  placeholder,
  label,
  validate,
  maxLength,
  error,
  type = "text"
}: FormInputType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (validate && !validate(value)) return;
    if (maxLength && value.length > maxLength) return;

    onChange(value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={`${name}-input`} className="mb-2 text-xs text-[var(--primary-color)]">
        {label}
      </label>
      <input
        className="border-b-1 border-[var(--secondary-color)] px-1.5 text-sm placeholder:text-[var(--text-muted)]"
        type={type}
        id={`${name}-input`}
        name={name}
        placeholder={placeholder}
        value={value === null ? "" : value}
        onChange={handleChange}
      />

      {error !== undefined && (
        <span className="mt-2 min-h-4 text-[10px] text-[var(--error-color)]">{error ?? ""}</span>
      )}
    </div>
  );
};

export default memo(FormInput);
