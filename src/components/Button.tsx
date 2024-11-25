import clsx from "clsx";
import React from "react";

type ButtonProps = {
  className?: string;
  children: any;
  onClick?: any;
};

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "bg-[#D2232D] text-white text-xs md:text-md lg:text-lg py-1 px-2 lg:px-6 rounded-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
