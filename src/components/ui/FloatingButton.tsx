"use client";

export type FloatingButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

const FloatingButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => <button onClick={handleClick}>{children}</button>;

export default FloatingButton;
