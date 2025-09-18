const options: Intl.DateTimeFormatOptions = {
  weekday: undefined,
  year: "numeric",
  month: "short",
  day: "numeric"
};

export const getDateLabel = (date: string) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayWithoutTime = today.toISOString().slice(0, 10);
  const yesterdayWithoutTime = yesterday.toISOString().slice(0, 10);

  if (date === todayWithoutTime) {
    return "Today";
  }
  if (date === yesterdayWithoutTime) {
    return "Yesterday";
  }
  return new Date(date).toLocaleDateString(undefined, options);
};
