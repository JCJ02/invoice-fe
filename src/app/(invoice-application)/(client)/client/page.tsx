"use client";

import Button from "@/components/Button";
import InputFields from "@/components/InputFields";
import Modal from "@/components/Modal";
import SearchInput from "@/components/SearchInput";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect, useState } from "react";
import { MdAccessAlarms } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
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
import { ClientTypes } from "@/hooks/useFetchClient";
import useFetchClient from "@/hooks/useFetchClient";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import generatePaginationLinks from "@/utils/generatePaginationLinks";

const Client = () => {
  useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBusinessNumberField, setShowBusinessNumberField] = useState(false);
  const [showMobilePhoneField, setShowMobilePhoneField] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    document.title = "Client - Invoice Application";
  });

  const { data, isPending, error } = useFetchClient(
    searchQuery,
    currentPage,
    limit
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleBusinessNumber = (event: any) => {
    event.preventDefault();
    setShowBusinessNumberField((previous) => !previous);
  };
  const toggleMobilePhone = (event: any) => {
    event.preventDefault();
    setShowMobilePhoneField((previous) => !previous);
  };
  const toggleAddress = (event: any) => {
    event.preventDefault();
    setShowAddress((previous) => !previous);
  };

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 py-5 pl-4 pr-8 overflow-y-scroll h-screen w-full">
        {/* TITLE */}
        <h1 className="font-semibold text-[#262626] text-md lg:text-2xl">
          Client
        </h1>
        <div className="flex flex-col gap-5 w-full">
          {/* 1ST SECTION */}
          <div className="flex justify-between w-full">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <Button onClick={openModal}>New Client</Button>
          </div>
          {/* 2ND SECTION */}
          <div className="flex flex-col gap-1 w-full">
            {/* CLIENT TABLE */}
            <Table>
              <TableHeader className="bg-[#D2232D]">
                <TableRow>
                  <TableHead className="text-white text-xs md:text-md">
                    Client Name/Company Name
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Email
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Business Phone
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Mobile Phone
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Address
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-xs md:text-md lg:text-lg text-gray-500"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-xs md:text-md lg:text-lg text-red-500"
                    >
                      {`Error: ${error}`}
                    </TableCell>
                  </TableRow>
                ) : data && data?.data?.clients?.length > 0 ? (
                  data.data.clients.map(
                    (client: ClientTypes, index: number) => (
                      <TableRow
                        key={client.id}
                        className={
                          index % 2 === 0 ? "bg-[#FBE9EA]" : "bg-white"
                        }
                      >
                        <TableCell className="flex flex-col">
                          <label className="text-sm">
                            {client.companyName}
                          </label>
                          <label className="text-sm text-gray-500">{`${client.firstname} ${client.lastname}`}</label>
                        </TableCell>
                        <TableCell className="text-sm">
                          {client.email}
                        </TableCell>
                        <TableCell className="text-sm">
                          {client.phoneNumber}
                        </TableCell>
                        <TableCell className="text-sm">
                          {client.businessPhone}
                        </TableCell>
                        <TableCell className="text-sm">
                          {client.mobilePhone}
                        </TableCell>
                        <TableCell className="text-sm">
                          {client.address}
                        </TableCell>
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
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-xs md:text-md text-gray-500"
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* PAGINATION */}
            <Pagination className="justify-end">
              <PaginationContent className="flex items-center">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {/* Dynamic Pagination Links */}
                {generatePaginationLinks(
                  currentPage,
                  Math.ceil((data?.data?.totalClients ?? 0) / limit)
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page ? "bg-[#D2232D] text-white" : ""
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={data && data?.data?.clients?.length < limit}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* NEW CLIENT MODAL */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <form className="flex bg-white">
            {/* NEW CLIENT FORM */}
            <div className="flex flex-col gap-2 border-r-[1px] border-r-[#BBBBBB] p-8 w-2/3">
              <h1 className="text-md md:text-xl font-semibold">New Client</h1>

              {/* 1st FIELD SECTION */}
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="flex flex-col items-start w-full">
                    <label className="text-xs md:text-sm">
                      First Name<b className="text-red-600">*</b>
                    </label>
                    <InputFields className="text-xs md:text-sm w-full" />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <label className="text-xs md:text-sm">
                      Last Name<b className="text-red-600">*</b>
                    </label>
                    <InputFields className="text-xs md:text-sm w-full" />
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <label className="text-xs md:text-sm">
                    Company Name<b className="text-red-600">*</b>
                  </label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
                <div className="flex flex-col items-start w-full md:w-1/2">
                  <label className="text-xs md:text-sm">Email Address</label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
                <div className="flex flex-col items-start w-full md:w-1/2">
                  <label className="text-xs md:text-sm">Phone Number</label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
              </div>

              {/* 2nd FIELD SECTION */}
              <div className="flex flex-col justify-start items-start gap-1">
                <Button
                  className="flex items-center gap-1 px-0 lg:px-0 bg-white"
                  onClick={toggleBusinessNumber}
                >
                  {showBusinessNumberField ? (
                    <FaMinus className="text-xs text-red-600" />
                  ) : (
                    <FaPlus className="text-xs text-red-600" />
                  )}
                  <label className="text-xs text-red-600 cursor-pointer">
                    Add Business Phone
                  </label>
                </Button>
                <div
                  className={`${
                    showBusinessNumberField
                      ? "flex flex-col items-start w-full"
                      : "hidden"
                  }`}
                >
                  <label className="text-xs md:text-sm">Business Number</label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
                <Button
                  className="flex items-center gap-1 px-0 lg:px-0 bg-white"
                  onClick={toggleMobilePhone}
                >
                  {showMobilePhoneField ? (
                    <FaMinus className="text-xs text-red-600" />
                  ) : (
                    <FaPlus className="text-xs text-red-600" />
                  )}
                  <label className="text-xs text-red-600 cursor-pointer">
                    Add Mobile Phone
                  </label>
                </Button>
                <div
                  className={`${
                    showMobilePhoneField
                      ? "flex flex-col items-start w-full"
                      : "hidden"
                  }`}
                >
                  <label className="text-xs md:text-sm">Mobile Phone</label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
                <Button
                  className="flex items-center gap-1 px-0 lg:px-0 bg-white"
                  onClick={toggleAddress}
                >
                  {showAddress ? (
                    <FaMinus className="text-xs text-red-600" />
                  ) : (
                    <FaPlus className="text-xs text-red-600" />
                  )}
                  <label className="text-xs text-red-600 cursor-pointer">
                    Address
                  </label>
                </Button>
                <div
                  className={`${
                    showAddress ? "flex flex-col items-start w-full" : "hidden"
                  }`}
                >
                  <label className="text-xs md:text-sm">Address</label>
                  <InputFields className="text-xs md:text-sm w-full" />
                </div>
              </div>

              {/* 3rd Field Section */}
              <div className="flex justify-end items-center gap-2 top-2">
                <Button className="bg-white" onClick={closeModal}>
                  <label className="text-xs text-red-600 cursor-pointer">
                    Cancel
                  </label>
                </Button>
                <Button className="lg:text-xs py-2 lg:px-8">Save</Button>
              </div>
            </div>

            {/* CLIENT SETTING SECTION */}
            <div className="flex flex-col gap-4 pt-8 pl-4 w-2/5">
              <h1 className="text-sm md:text-md font-semibold">
                Client Setting
              </h1>
              <div className="flex flex-col w-full">
                <div className="flex items-start gap-1 py-3 border-t-[1px] border-b-[1px] border-t-[#BBBBBB] border-b-[#BBBBBB] w-full">
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="text-xs">Send Reminders</h1>
                    <p className="text-xs text-[#BBBBBB]">
                      At Customizable Intervals
                    </p>
                  </div>
                  <Button className="flex items-center bg-white">
                    <label className="text-black text-xs">No</label>
                    <MdOutlineKeyboardArrowRight className="text-black text-xs" />
                  </Button>
                </div>
                <div className="flex items-start gap-1 py-3 border-b-[1px] border-t-[#BBBBBB] border-b-[#BBBBBB] w-full">
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="text-xs">Charge Late Fees</h1>
                    <p className="text-xs text-[#BBBBBB]">
                      Percentage or Flat Rate Fees
                    </p>
                  </div>
                  <Button className="flex items-center bg-white">
                    <label className="text-black text-xs">No</label>
                    <MdOutlineKeyboardArrowRight className="text-black text-xs" />
                  </Button>
                </div>
                <div className="flex items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="text-xs">Country & Language</h1>
                    <p className="text-xs text-[#BBBBBB]">
                      PHP, English (United States)
                    </p>
                  </div>
                  <Button className="flex items-center bg-white">
                    <MdOutlineKeyboardArrowRight className="text-black text-xs" />
                  </Button>
                </div>
                <div className="flex items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="text-xs">Invoice Attatchments</h1>
                    <p className="break-words text-xs text-[#BBBBBB]">
                      Attatch PDF copy to emails
                    </p>
                  </div>
                  <Button className="flex items-center bg-white">
                    <label className="text-black text-xs">No</label>
                    <MdOutlineKeyboardArrowRight className="text-black text-xs" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Client;
