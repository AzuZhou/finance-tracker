"use client";

import { GroupedOptions } from "@/lib/types";
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type SelectProps = {
  label: string;
  name: string;
  setValue: (value: string | null) => void;
  defaultOption: string;
  value: string | null;
  groupedOptions: GroupedOptions;
  isMandatory?: boolean;
  disabled?: boolean;
};

const Select = ({
  label,
  name,
  setValue,
  value,
  defaultOption,
  groupedOptions,
  isMandatory,
  disabled
}: SelectProps) => {
  const selectedOptionLabel =
    groupedOptions.flatMap((group) => group.options).find((opt) => opt.value === value)?.label ??
    defaultOption;
  const multipleOptionGroups = groupedOptions.length > 1;

  return (
    <Field className="flex flex-col gap-2 data-disabled:opacity-50" disabled={disabled}>
      <Label className="text-xs text-[var(--primary-color)]">{label}</Label>

      <Listbox name={name} value={value} onChange={setValue}>
        <ListboxButton
          value={value === null ? undefined : value}
          className={`relative border-b-1 border-[var(--secondary-color)] text-start indent-1.5 text-sm data-disabled:cursor-not-allowed ${value ? "" : "text-[var(--text-muted)]"}`}
        >
          {selectedOptionLabel}
          <ChevronDownIcon
            className="pointer-events-none absolute top-0 right-1.5 bottom-0 m-auto size-4 fill-[var(--text-muted)]"
            aria-hidden="true"
          />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom"
          transition
          className="max-h-36 w-(--button-width) overflow-y-auto rounded-b-sm border border-[var(--foreground)] bg-[var(--foreground)] px-2"
        >
          {!isMandatory && (
            <ListboxOption
              key={"default-option-select"}
              value={null}
              className="text-[var(--primary-color) mt-2 cursor-default py-1 text-sm text-[var(--text-muted)] data-[headlessui-state~=active]:text-[var(--primary-color)] data-[headlessui-state~=selected]:text-[var(--primary-color)]"
            >
              {defaultOption}
            </ListboxOption>
          )}

          {groupedOptions.map(({ groupLabel, options }) => (
            <div
              key={multipleOptionGroups ? `multiple-option-groups-${groupLabel}` : groupLabel}
              className={`${multipleOptionGroups ? "mt-2 divide-y divide-[var(--secondary-color)]" : ""}`}
            >
              {multipleOptionGroups && (
                <h3 className="pb-1 text-sm font-semibold text-[var(--text-muted)]">
                  {groupLabel}
                </h3>
              )}

              {options.map(({ value, label }) => (
                <ListboxOption
                  key={value}
                  value={value}
                  className="text-[var(--primary-color) cursor-default py-1 text-sm text-[var(--text-muted)] data-[headlessui-state~=active]:text-[var(--primary-color)] data-[headlessui-state~=selected]:text-[var(--primary-color)]"
                >
                  {label}
                </ListboxOption>
              ))}
            </div>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

export default Select;
