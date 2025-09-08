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
      className="flex flex-col items-center gap-1 cursor-pointer"
      aria-label={label}
    >
      <Icon className="w-8 h-8 border border-[var(--foreground)] rounded-full bg-[var(--background)] p-1" />
      <div className="pl-1 pr-1 bg-[var(--background)]/75 rounded-xs">
        <span className="text-xs">{label}</span>
      </div>
    </button>
  );
};

export default FloatingButton;
