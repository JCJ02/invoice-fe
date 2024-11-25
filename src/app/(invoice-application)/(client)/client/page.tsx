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

const Client = () => {
  useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBusinessNumberField, setShowBusinessNumberField] = useState(false);
  const [showMobilePhoneField, setShowMobilePhoneField] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

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

  useEffect(() => {
    document.title = "Client - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 py-5 pl-4 pr-8 h-full w-full">
        <h1 className="font-semibold text-[#262626] text-md lg:text-2xl">
          Client
        </h1>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-between w-full">
            <SearchInput />
            <Button onClick={openModal}>New Client</Button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <form className="flex bg-white">
            {/* New Client */}
            <div className="flex flex-col gap-2 border-r-[1px] border-r-[#BBBBBB] p-8 w-2/3">
              <h1 className="text-md md:text-xl font-semibold">New Client</h1>

              {/* 1st Field Section */}
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

              {/* 2nd Field Section */}
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
                  <label className="text-xs text-red-600">
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
                  <label className="text-xs text-red-600">
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
                  <label className="text-xs text-red-600">Address</label>
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
                  <label className="text-xs text-red-600">Cancel</label>
                </Button>
                <Button className="lg:text-xs py-2 lg:px-8">Save</Button>
              </div>
            </div>

            {/* Client Setting */}
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
