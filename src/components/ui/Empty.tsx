type EmptyProps = {
  title: string;
  message: string;
  gap?: string;
  marginTop?: string;
};
const Empty = ({ title, message, gap, marginTop }: EmptyProps) => {
  return (
    <div
      className={`flex h-full min-h-28 w-full flex-col items-center ${gap ?? "gap-3"} ${marginTop ?? "mt-18"}`}
    >
      <p className="text-base font-semibold text-[var(--text-muted)]">{title}</p>
      <span className="text-sm text-[var(--text-muted)]">{message}</span>
    </div>
  );
};

export default Empty;
