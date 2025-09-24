import { DateRangeType } from "../types";

const getNormalizedDateRange = (range: DateRangeType) => {
  let fromCopy: Date | null = null;
  let toCopy: Date | null = null;

  if (range.from) {
    fromCopy = new Date(range.from.getTime());
    fromCopy.setHours(0, 0, 0, 0);
  }

  if (range.to) {
    toCopy = new Date(range.to.getTime());
    toCopy.setHours(23, 59, 59, 999);
  }

  return { from: fromCopy, to: toCopy };
};

export default getNormalizedDateRange;
