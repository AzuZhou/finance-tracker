"use client";

import { TransactionType } from "@/lib/types";

type RadioType = {
  selected: TransactionType | null;
  options: string[];
  setSelected: (value: TransactionType | null) => void;
  name: string;
  label: string;
};

//group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400
// invisible size-2 rounded-full bg-white group-data-checked:visible
const Radio = ({ selected, options, setSelected, name, label }: RadioType) => {
  const allOptions = ["all", ...options];

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== "expense" && value !== "income") return setSelected(null);

    setSelected(value);
  };

  return (
    <fieldset>
      <legend className="mb-2 text-xs text-[var(--primary-color)]">{label}</legend>
      <div className="flex divide-x divide-[var(--secondary-color)] text-sm">
        {allOptions.map((option, index) => {
          const checked = (option === "all" && selected === null) || selected === option;

          return (
            <div key={option} className="relative flex flex-1 items-center justify-center gap-1.5">
              <input
                type="radio"
                id={`${name}-${option}`}
                name={name}
                value={option}
                checked={checked}
                onChange={handleChage}
                className="absolute -z-1 h-full w-full"
              />
              <label
                htmlFor={`${name}-${option}`}
                className={`${checked ? "bg-[var(--foreground)]" : "bg-[var(--background)] text-[var(--text-muted)]"} h-full w-full cursor-pointer border-y border-[var(--secondary-color)] py-3.5 text-center hover:text-[var(--text-color)] ${index === 0 ? "rounded-l-lg border border-r-0" : ""} ${index === allOptions.length - 1 ? "rounded-r-lg border border-l-0" : ""} sm:py-2`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default Radio;
