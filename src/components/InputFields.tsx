import clsx from "clsx";
import React from "react";

type InputProps = {
  className?: string;
  type?: string;
  onChange?: any;
  name?: string;
  value?: any;
  placeholder?: string;
};

const InputFields = ({
  className,
  type,
  onChange,
  name,
  value,
  placeholder,
}: InputProps) => {
  return (
    <input
      className={clsx(
        "border-[1px] border-[#BBBBBB] py-2 pl-1 rounded-md",
        className
      )}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default InputFields;
