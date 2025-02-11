import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  className?: string;
  children: any;
  onClick?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  name?: string;
};

const Button = ({
  className,
  children,
  onClick,
  disabled,
  type,
  name,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-[#D2232D] text-white text-xs md:text-md lg:text-lg py-1 px-2 lg:px-6 rounded-md",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;
