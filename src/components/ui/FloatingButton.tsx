"use client";

export type FloatingButtonProps = {
  handleClick: () => void;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FloatingButton = ({
  handleClick,
  label,
  icon: Icon,
}: FloatingButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer flex-col items-center gap-1"
      aria-label={label}
    >
      <Icon className="h-8 w-8 rounded-full border border-[var(--foreground)] bg-[var(--background)] p-1" />
      <div className="rounded-xs bg-[var(--background)]/75 pr-1 pl-1">
        <span className="text-xs">{label}</span>
      </div>
    </button>
  );
};

export default FloatingButton;
