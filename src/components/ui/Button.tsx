type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  type: "submit" | "button" | undefined;
  variant?: ButtonVariant;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  type,
  variant = "primary",
  disabled = false,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantStyles = {
    primary:
      "text-[var(--background)] bg-[var(--primary-color)] sm:bg-[--var(background)] border-[var(--primary-color)] sm:text-[var(--primary-color)] sm:hover:text-[var(--background)] sm:hover:bg-[var(--primary-color)]",
    secondary:
      "text-[var(--background)] bg-[var(--error-color)] sm:bg-[--var(background)] border-[var(--error-color)] sm:text-[var(--error-color)] sm:hover:text-[var(--background)] sm:hover:bg-[var(--error-color)]",
  };

  return (
    <button
      type={type}
      className={`w-full cursor-pointer rounded-lg border py-3.5 text-sm font-medium sm:py-2 ${variantStyles[variant as ButtonVariant]} ${disabled ? "cursor-not-allowed" : ""}}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
