"use client";

import Button from "@/components/ui/Button";

export type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
};

const Form = ({
  children,
  onSubmit,
  onClose,
  submitLabel = "Accept",
  cancelLabel = "Cancel",
  disabled = false
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Button type="submit" disabled={disabled}>
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
