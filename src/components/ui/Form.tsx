"use client";

export type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
};

const Form = ({ children, onSubmit, title }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {title && (
        <h2 className="font-center my-4 text-lg font-medium">{title}</h2>
      )}

      {children}
    </form>
  );
};

export default Form;
