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
      className="flex cursor-pointer flex-col items-center gap-2"
      aria-label={label}
    >
      <Icon className="h-8 w-8 rounded-full border border-[var(--primary-color)] bg-[var(--primary-color)] p-1 text-[var(--background)]" />
      <div className="flex rounded-xs bg-[var(--background)]/95 pr-1 pl-1">
        <span className="text-[10px] text-[var(--primary-color)]">{label}</span>
      </div>
    </button>
  );
};

export default FloatingButton;
