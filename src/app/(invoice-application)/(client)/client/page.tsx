"use client";

import Button from "@/components/Button";
import InputFields from "@/components/InputFields";
import Modal from "@/components/Modal";
import SearchInput from "@/components/SearchInput";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect, useState } from "react";
import { MdAccessAlarms } from "react-icons/md";

const Client = () => {
  useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div className="flex flex-col gap-2 border-r-[#BBBBBB] p-8 w-3/4">
              <h1 className="text-xl font-semibold">New Client</h1>
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 w-full">
                  <div className="flex flex-col items-start w-full">
                    <label className="text-sm">
                      First Name<b className="text-red-600">*</b>
                    </label>
                    <InputFields className="w-full" />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <label className="text-sm">
                      Last Name<b className="text-red-600">*</b>
                    </label>
                    <InputFields className="w-full" />
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <label className="text-sm">
                    Company Name<b className="text-red-600">*</b>
                  </label>
                  <InputFields className="w-full" />
                </div>
                <div className="flex flex-col items-start w-full md:w-1/2">
                  <label className="text-sm">Email Address</label>
                  <InputFields className="w-full" />
                </div>
                <div className="flex flex-col items-start w-full md:w-1/2">
                  <label className="text-sm">Phone Number</label>
                  <InputFields className="w-full" />
                </div>
              </div>
            </div>
            <div className="pt-8 w-3/12">
              <h1 className="text-md font-semibold">Client Setting</h1>
              <div className="flex flex-col w-full">
                <div>
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="">Send Reminders</h1>
                    <p className="text-[#BBBBBB]">At Customizable Intervals</p>
                  </div>
                </div>
                <div>
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="">Send Reminders</h1>
                    <p className="text-[#BBBBBB]">At Customizable Intervals</p>
                  </div>
                </div>
                <div>
                  <MdAccessAlarms />
                  <div className="flex flex-col items-start">
                    <h1 className="">Send Reminders</h1>
                    <p className="text-[#BBBBBB]">At Customizable Intervals</p>
                  </div>
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
