import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type SelectProps = {
  label: string;
  name: string;
  setValue: (val: string) => void;
  defaultOption: string;
  value: string;
  options: string[];
};

const Select = ({
  label,
  name,
  setValue,
  value,
  defaultOption,
  options,
}: SelectProps) => {
  return (
    <Field className="flex flex-col gap-2">
      <Label className="text-xs text-[var(--primary-color)]">{label}</Label>
      <Listbox name={name} value={value} onChange={setValue}>
        <ListboxButton
          value={value}
          className={`relative border-b-1 border-[var(--secondary-color)] text-start indent-1.5 text-sm ${value ? "" : "text-[var(--text-muted)]"}`}
        >
          {value || defaultOption}
          <ChevronDownIcon
            className="pointer-events-none absolute top-0 right-1.5 bottom-0 m-auto size-4 fill-[var(--text-muted)]"
            aria-hidden="true"
          />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom"
          transition
          className="min-w-60 divide-y divide-[var(--secondary-color)] rounded-sm border border-[var(--foreground)] bg-[var(--foreground)] px-2"
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="text-[var(--primary-color) cursor-default py-1 text-sm text-[var(--text-muted)] data-[headlessui-state~=active]:text-[var(--primary-color)] data-[headlessui-state~=selected]:text-[var(--primary-color)]"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

export default Select;
