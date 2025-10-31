import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-2 rounded-md text-white transition ${className} disabled:opacity-40`}
    aria-disabled={disabled}
  >
    {children}
  </button>
);

export default Button;