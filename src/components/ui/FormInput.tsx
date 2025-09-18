"use client";

type FormInputType = {
  name: string;
  value: string;
  placeholder: string;
  label: string;
  setValue: (val: string) => void;
  validate?: (val: string) => boolean;
  maxLength?: number;
  error?: string;
};

const FormInput = ({
  value,
  setValue,
  name,
  placeholder,
  label,
  validate,
  maxLength,
  error
}: FormInputType) => {
  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (validate && !validate(value)) return;

    if (maxLength && value.length > maxLength) return;

    setValue(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs text-[var(--primary-color)]">
        {label}
      </label>
      <input
        className="border-b-1 border-[var(--secondary-color)] px-1.5 text-sm placeholder:text-[var(--text-muted)]"
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChage}
      />
      {error && <span className="text-xs text-[var(--error-color)]">{error}</span>}
    </div>
  );
};

export default FormInput;
