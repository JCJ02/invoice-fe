"use client";

import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect } from "react";

const Invoices = () => {
  useAuthentication();

  useEffect(() => {
    document.title = "Invoices - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 h-full w-full">
        {/* 1st Section */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-md lg:text-2xl">Invoices</h1>
          <Button>New Invoice</Button>
        </div>
        <hr className="border-[1px] border-solid w-full" />

        {/* 2nd Section */}
        <div className="flex flex-col md:flex-row md:justify-around items-center gap-4 pt-2 pb-5 pl-4 pr-8 w-full">
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱4.5m PHP
            </h1>
            <p className="text-[#BBBBBB] text-xs">Overdue</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱4.5m PHP
            </h1>
            <p className="text-[#BBBBBB] text-xs">Total Outstanding</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱4.5m PHP
            </h1>
            <p className="text-[#BBBBBB] text-xs">In Draft</p>
          </div>
        </div>
        <hr className="border-[1px] border-solid ml-4 mr-8" />

        {/* 3rd Section */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-sm md:text-md lg:text-xl">
            All Invoices
          </h1>
          <SearchInput />
        </div>
      </div>
    </>
  );
};

export default Invoices;
