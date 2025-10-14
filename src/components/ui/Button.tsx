type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  type?: "submit" | "button" | undefined;
  variant?: ButtonVariant;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  type = "button",
  variant = "primary",
  disabled = false,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantStyles = {
    primary: "primary-button",
    secondary: "secondary-button"
  };

  return (
    <button
      type={type}
      className={`w-full rounded-lg border py-3.5 text-sm font-medium sm:py-2 ${variantStyles[variant as ButtonVariant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
