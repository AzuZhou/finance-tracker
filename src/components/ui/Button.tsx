type ButtonStyleVariant = "primary" | "secondary";
type ButtonShapeVariant = "classic" | "round";

type ButtonProps = {
  type?: "submit" | "button" | undefined;
  variant?: ButtonStyleVariant;
  disabled?: boolean;
  shape?: ButtonShapeVariant;
  children: React.ReactNode;
  className?: string;
};

const Button = ({
  type = "button",
  variant = "primary",
  shape = "classic",
  disabled = false,
  children,
  className = "",
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles =
    "border cursor-pointer enabled:active:scale-[0.97] text-sm text-nowrap " +
    "transition-[background-color,color,transform] duration-200";

  const variantShapes = {
    classic: "w-full rounded-lg py-3.5 sm:py-2 m-h-10 px-2.5",
    round: "rounded-full p-1"
  };

  const variantStyles = {
    primary:
      "bg-[var(--background)] text-[var(--primary-color)] border-[var(--primary-color)] " +
      "enabled:hover:bg-[var(--primary-color)] enabled:hover:text-[var(--background)] " +
      `${shape === "classic" ? "enabled:focus:bg-[var(--primary-color)] enabled:focus:text-[var(--background)]" : ""}`,
    secondary:
      "bg-[var(--background)] text-[var(--text-muted)] border-[var(--text-muted)] " +
      "enabled:hover:bg-[var(--text-muted)] enabled:hover:text-[var(--background)] " +
      `${shape === "classic" ? "enabled:focus:bg-[var(--text-muted)] enabled:focus:text-[var(--background)]" : ""}`
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantShapes[shape]} ${variantStyles[variant]} ${disabled ? "disabled" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
