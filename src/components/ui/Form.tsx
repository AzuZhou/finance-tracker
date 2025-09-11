"use client";

export type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
};

const Form = ({ children, onSubmit, title }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {title && (
        <h2 className="font-center mb-4 text-lg font-medium">{title}</h2>
      )}

      {children}
    </form>
  );
};

export default Form;
