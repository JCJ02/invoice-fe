import React from "react";
import { cn } from "@/lib/utils";

type InputSearchProps = {
  className?: string;
  onChange?: any;
  name?: string;
  value?: any;
};

const SearchInput = ({
  className,
  onChange,
  name,
  value,
}: InputSearchProps) => {
  return (
    <input
      className={cn(
        "border-2 border-[#EEEEEE] text-xs md:text-md lg:text-lg rounded-md py-1 pl-2 lg:pr-44",
        className
      )}
      type="text"
      placeholder="Search"
      onChange={onChange}
      name={name}
      value={value}
    />
  );
};

export default SearchInput;
