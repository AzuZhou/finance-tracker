import { ArrowPathIcon } from "@heroicons/react/24/solid";

type LoadingSpinnerProps = {
  gap?: string;
  marginTop?: string;
};

const LoadingSpinner = ({ gap, marginTop }: LoadingSpinnerProps) => (
  <div
    className={`flex h-full min-h-28 w-full flex-col items-center ${gap ?? "gap-3"} ${marginTop ?? "mt-18"}`}
  >
    <ArrowPathIcon className="h-8 w-8 animate-spin rounded-full text-[var(--primary-color)] duration-75" />
    <span className="text-[var(--text-muted)]] text-sm">Cooking...</span>
  </div>
);

export default LoadingSpinner;
