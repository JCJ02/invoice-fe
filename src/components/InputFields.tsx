import { cn } from "@/lib/utils";
import React from "react";

type InputProps = {
  className?: string;
  type?: string;
  onChange?: any;
  name?: string;
  value?: any;
  placeholder?: string;
  readOnly?: true;
};

const InputFields = ({
  className,
  type,
  onChange,
  name,
  value,
  placeholder,
  readOnly,
}: InputProps) => {
  return (
    <input
      className={cn(
        "border-[1px] border-[#BBBBBB] py-2 pl-1 rounded-md",
        className
      )}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
};

export default InputFields;
