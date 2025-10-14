"use client";

import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { memo } from "react";

import { CategoryType, GroupedOptions } from "@/lib/types";

type SelectProps = {
  label: string;
  name: string;
  onChange: (value: CategoryType) => void;
  defaultValue?: string;
  defaultLabel?: string;
  value: CategoryType;
  groupedOptions: GroupedOptions;
  disabled?: boolean;
  error?: string | null;
};

const Select = ({
  label,
  name,
  onChange,
  value,
  defaultLabel = "Select an option",
  groupedOptions,
  disabled,
  error
}: SelectProps) => {
  const selectedOptionLabel =
    groupedOptions.flatMap((group) => group.options).find((opt) => opt.value === value)?.label ??
    defaultLabel;
  const multipleOptionGroups = groupedOptions.length > 1;

  return (
    <div className="flex flex-col">
      <Field className="flex flex-col data-disabled:opacity-50" disabled={disabled}>
        <Label className="mb-2 text-xs text-[var(--primary-color)]">{label}</Label>

        <Listbox name={name} onChange={onChange}>
          <ListboxButton
            value={value}
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
            <ListboxOption
              value=""
              className="text-[var(--primary-color) cursor-default py-1 text-sm text-[var(--text-muted)] data-[headlessui-state~=active]:text-[var(--primary-color)] data-[headlessui-state~=selected]:text-[var(--primary-color)]"
            >
              {defaultLabel}
            </ListboxOption>

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

      {error !== undefined && (
        <span className="mt-2 min-h-4 text-[10px] text-[var(--error-color)]">{error ?? ""}</span>
      )}
    </div>
  );
};

export default memo(Select);
