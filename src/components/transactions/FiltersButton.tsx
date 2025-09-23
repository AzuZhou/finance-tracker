"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const FiltersButton = ({ handleClick }: { handleClick: () => void }) => (
  <button
    onClick={handleClick}
    className="mb-5 flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[var(--foreground)] p-2 text-start text-sm text-[var(--text-muted)]"
  >
    <MagnifyingGlassIcon className="h-4 w-4 text-[var(--text-muted)]" /> Search
  </button>
);

export default FiltersButton;
