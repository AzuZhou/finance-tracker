"use client";

import { DateRangeType } from "@/lib/types";

const formatDateForInput = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
const parseLocalDate = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const DatePicker = ({
  range,
  onRangeChange
}: {
  range: DateRangeType;
  onRangeChange: (value: DateRangeType) => void;
}) => {
  const today = parseLocalDate(formatDateForInput(new Date()));

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) return onRangeChange({ ...range, from: null });

    const newFrom = parseLocalDate(value);

    if (range?.to && newFrom > range.to) return;
    if (newFrom > today) return;

    onRangeChange({ ...range, from: newFrom });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) return onRangeChange({ ...range, to: null });

    const newTo = parseLocalDate(value);

    if (range?.from && newTo < range.from) return;
    if (newTo > today) return;

    onRangeChange({ ...range, to: newTo });
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="from-date-input" className="text-xs text-[var(--primary-color)]">
          From
        </label>

        <input
          type="date"
          className={`border-b-1 border-[var(--secondary-color)] px-1.5 text-sm ${range?.from === null ? "text-[var(--text-muted)]" : ""}`}
          name="from-date"
          id="from-date-input"
          value={range.from ? formatDateForInput(range.from) : ""}
          onChange={handleFromChange}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="to-date-input" className="text-xs text-[var(--primary-color)]">
          To
        </label>
        <input
          type="date"
          className={`border-b-1 border-[var(--secondary-color)] px-1.5 text-sm ${range?.to === null ? "text-[var(--text-muted)]" : ""}`}
          name="to-date"
          id="to-date-input"
          value={range.to ? formatDateForInput(range.to) : ""}
          onChange={handleToChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
