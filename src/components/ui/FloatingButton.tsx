"use client";

export type FloatingButtonProps = {
  handleClick: () => void;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

const FloatingButton = ({ handleClick, label, icon: Icon, disabled }: FloatingButtonProps) => (
  <div className="flex flex-col items-center gap-2">
    <button
      disabled={disabled}
      className="primary-button rounded-full border"
      onClick={handleClick}
    >
      <Icon className="h-8 w-8 p-1" />
    </button>
    <span
      className={`rounded-xs bg-[var(--background)]/95 pr-1 pl-1 text-[10px] text-[var(--primary-color)] ${disabled ? "disabled" : ""}`}
    >
      {label}
    </span>
  </div>
);

export default FloatingButton;
