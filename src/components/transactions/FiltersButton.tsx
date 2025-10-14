"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const FiltersButton = ({
  handleClick,
  disabled = false
}: {
  handleClick: () => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={handleClick}
    className="mb-5 flex w-full items-center gap-1 rounded-lg bg-[var(--foreground)] p-2 text-start text-sm text-[var(--text-muted)] active:scale-none"
  >
    <MagnifyingGlassIcon className="h-4 w-4 text-[var(--text-muted)]" /> Search
  </button>
);

export default FiltersButton;
