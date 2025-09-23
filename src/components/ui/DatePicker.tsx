"use client";

import { DateRangeType } from "@/lib/types";

const DatePicker = ({
  range,
  onRangeChange
}: {
  range: DateRangeType;
  onRangeChange: (value: DateRangeType) => void;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFrom = new Date(value);

    if (range?.to && newFrom > range.to) return;
    if (newFrom > new Date()) return;

    onRangeChange({ ...range, from: newFrom });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newTo = new Date(value);

    if (range?.from && newTo < range.from) return;
    if (newTo > new Date()) return;

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
          value={range.from?.toISOString().split("T")[0] ?? ""}
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
          value={range.to?.toISOString().split("T")[0] ?? ""}
          onChange={handleToChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
