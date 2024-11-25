import React from "react";

type InputSearchProps = {
  onChange?: any;
  name?: string;
  value?: any;
};

const SearchInput = ({ onChange, name, value }: InputSearchProps) => {
  return (
    <input
      className="border-2 border-[#EEEEEE] text-xs md:text-md lg:text-lg rounded-md pl-2 lg:pr-44"
      type="text"
      placeholder="Search"
      onChange={onChange}
      name={name}
      value={value}
    />
  );
};

export default SearchInput;
