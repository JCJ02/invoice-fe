import React, { useEffect } from "react";
import lwsMainLogo from "../../../../../assets/images/lws-main-logo.png";
import { MdAccessAlarms, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Button from "@/components/Button";
import Image from "next/image";
import InputFields from "@/components/InputFields";
import { FaPlus } from "react-icons/fa6";
import { ClientType } from "@/types/ClientType";

type NewInvoiceFormProps = {
  closeModal: any;
  client?: ClientType;
};

const NewInvoicesForm = ({ closeModal, client }: NewInvoiceFormProps) => {
  useEffect(() => {
    document.title = "New Invoices - Invoice Application";
  }, []);
  return (
    <>
      <form className="bg-white flex font-poppins" key={client?.id}>
        {/* NEW INVOICE FORM */}
        <div className="flex flex-col justify-between items-start gap-4 border-r-[1px] border-[#BBBBBB] p-10 w-2/3 lg:w-[640px]">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-xl font-semibold w-full">New Invoice</h1>
            <div className="flex flex-col items-start py-12 px-8 gap-10 [box-shadow:0_0_25px_5px_rgba(0,0,0,0.1)] w-full">
              {/* HEADER */}
              <div className="flex justify-between items-start gap-10 lg:gap-20 w-full">
                <Image className="w-32" alt="LWS Main Logo" src={lwsMainLogo} />
                <div className="flex flex-col items-end">
                  <p className="text-xs">Lightweight Solutions</p>
                  <p className="text-xs">(02) 750-920-95</p>
                  <p className="text-xs">
                    5F, Phinma Plaza, 30 Plaza Drive Rockwell Center
                  </p>
                  <p className="text-xs">Makati City Metro Manila 1210</p>
                </div>
              </div>

              {/* CLIENT INFORMATION */}
              <div className="flex justify-between items-start gap-2 font-poppins w-full">
                <div className="flex items-start gap-8 w-full">
                  {/* BILLED TO */}
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-xs text-red-600">Billed To</h1>
                    <div className="flex flex-col items-start">
                      <label className="text-xs">{client?.companyName}</label>
                      <label className="text-xs">{`${client?.firstname} ${client?.lastname}`}</label>
                    </div>
                  </div>

                  {/* DATE OF ISSUE & DUE */}
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Date of Issue</h1>
                      <label className="text-xs">11/30/2024</label>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Date of Due</h1>
                      <label className="text-xs">11/30/2024</label>
                    </div>
                  </div>
                </div>

                {/* AMOUNT DUE */}
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xs text-red-600">Amount Due (PHP)</h1>
                  <label className="text-xl">₱0.00</label>
                </div>
              </div>

              {/* ADD INVOICES */}
              <div className="flex flex-col items-center gap-1 border-t-2 border-red-600 w-full">
                {/* FIELDS TITLE */}
                <div className="flex justify-between items-center py-2 w-full">
                  <label className="text-xs text-red-600 w-1/4">
                    Description
                  </label>
                  <label className="text-xs text-red-600">Rate</label>
                  <label className="text-xs text-red-600">Quantity</label>
                  <label className="text-xs text-red-600">Line Total</label>
                </div>
                <div className="flex justify-between items-center gap-1 w-full">
                  <InputFields
                    className="text-xs w-1/2"
                    placeholder="Description"
                  />
                  <InputFields className="text-xs w-1/4" placeholder="Rate" />
                  <InputFields
                    className="text-xs w-1/4"
                    placeholder="Quantity"
                  />
                  <InputFields
                    className="text-xs w-1/4"
                    placeholder="Line Total"
                  />
                </div>
                <Button className="flex justify-center items-center gap-1 bg-white border-dotted border-4 my-1 text-black w-full">
                  <FaPlus className="cursor-pointer" /> Add a Line
                  {/* <label className="cursor-pointer text-xs">Add a Line</label> */}
                </Button>
              </div>

              {/* NOTES and TERMS */}
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="flex flex-col items-start">
                  <h1 className="text-xs text-red-600">Notes</h1>
                  <label className="text-xs text-justify">
                    Enter note or bank transfer details (optional).
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-xs text-red-600">Terms</h1>
                  <label className="text-xs text-justify">
                    Enter your terms and condition. (Pro tip: It pays to be
                    polite. Lightweight Solutions invoice app that include
                    “Please” and “thanks” get paid up to 2 days faster.).
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS SECTION */}
          <div className="flex self-end items-center gap-2">
            <Button
              className="bg-white text-xs text-red-600 px-4 lg:px-10 border-2 border-white hover:border-red-600 hover:border-2"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button className="text-xs border-2 border-[#D2232D] px-4 lg:px-10">
              Save
            </Button>
            <Button className="text-xs border-2 border-[#D2232D] px-4 lg:px-10">
              Send To
            </Button>
          </div>
        </div>

        {/* SETTINGS SECTION */}
        <div className="flex flex-col items-start gap-1 py-10 pl-8 w-2/6 lg:w-[320px]">
          <h1 className="text-md font-semibold">Settings</h1>
          <div className="flex flex-col w-full">
            {/* FOR THIS INVOICE SECTION */}
            <h1 className="text-xs">For This Invoice</h1>
            <div className="flex justify-between items-start gap-1 py-3 border-t-[1px] border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <label className="text-xs">Accept Online Payment</label>
                  <label className="text-xs text-[#BBBBBB]">
                    Let Clients Pay You Online
                  </label>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <label className="text-xs">Customize Invoice Style</label>
                  <label className="text-xs text-[#BBBBBB]">
                    Change Template, Color and Font
                  </label>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <label className="text-xs">Make Recurring</label>
                  <label className="text-xs text-[#BBBBBB]">
                    Bill Your Clienet Automatically
                  </label>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>

            {/* FOR SAMPLE SECTION */}
            <h1 className="text-xs mt-8">For Sample</h1>
            <div className="flex justify-between items-start gap-1 py-3 border-t-[1px] border-b-[1px] border-t-[#BBBBBB] border-b-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs">Send Reminders</h1>
                  <p className="text-xs text-[#BBBBBB]">
                    At Customizable Intervals
                  </p>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs">Charge Late Fees</h1>
                  <p className="text-xs text-[#BBBBBB]">
                    Percentage or Flat Rate Fees
                  </p>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs">Country & Language</h1>
                  <p className="text-xs text-[#BBBBBB]">
                    PHP, English (United States)
                  </p>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs">Invoice Attatchments</h1>
                  <p className="break-words text-xs text-[#BBBBBB]">
                    Attatch PDF copy to emails
                  </p>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewInvoicesForm;
