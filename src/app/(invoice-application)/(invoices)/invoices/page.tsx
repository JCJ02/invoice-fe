"use client";

import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Invoices = () => {
  useAuthentication();

  useEffect(() => {
    document.title = "Invoices - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 overflow-y-scroll h-screen w-full">
        {/* 1ST SECTION */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-md lg:text-2xl">Invoices</h1>
          <Button>New Invoice</Button>
        </div>
        <hr className="border-[1px] border-solid w-full" />

        {/* 2ND SECTION */}
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

        {/* 3RD SECTION */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-sm md:text-md lg:text-xl">
            All Invoices
          </h1>
          <SearchInput />
        </div>

        {/* 4TH SECTION */}
        <div className="pt-5 pl-4 pr-8 w-full">
          <Table>
            <TableHeader className="bg-[#D2232D]">
              <TableRow>
                <TableHead className="text-white text-xs md:text-md">
                  Client/Invoice Number
                </TableHead>
                <TableHead className="text-white text-xs md:text-md">
                  Description
                </TableHead>
                <TableHead className="text-white text-xs md:text-md">
                  Issued Date/Due Date
                </TableHead>
                <TableHead className="text-white text-xs md:text-md">
                  Total Outstanding
                </TableHead>
                <TableHead className="text-white text-xs md:text-md">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>₱ 0.00 PHP</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Button className="bg-white px-1 lg:px-1 py-1 text-black text-sm">
                    <IoEyeOutline />
                  </Button>
                  <Button className="bg-white px-1 lg:px-1 py-1 text-black text-sm">
                    <FaRegEdit />
                  </Button>
                  <Button className="bg-white px-1 lg:px-1 py-1 text-black text-sm">
                    <MdDeleteOutline />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Invoices;
