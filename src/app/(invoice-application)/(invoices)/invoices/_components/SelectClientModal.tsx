import Button from "@/components/Button";
import React, { useEffect } from "react";

type SelectClientModalProps = {
  closeModal: () => void;
  openNewInvoiceForm: () => void;
};

const SelectClientModal = ({
  closeModal,
  openNewInvoiceForm,
}: SelectClientModalProps) => {
  useEffect(() => {
    document.title = "Select Client - Invoice Application";
  }, []);
  return (
    <>
      <div className="bg-white flex flex-col items-start gap-4 font-poppins p-8 w-[320px] md:w-[500px]">
        <h1 className="text-xl font-semibold">Client List</h1>
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-xs">Client</label>
          <select className="text-[#AAAAAA] border-[1px] border-[#CCCCCC] py-2 rounded-md w-full">
            <option className="text-sm" value={""}>
              Select Client
            </option>
            <option className="text-sm" value={""}>
              Select Client
            </option>
            <option className="text-sm" value={""}>
              Select Client
            </option>
            <option className="text-sm" value={""}>
              Select Client
            </option>
          </select>
        </div>
        <div className="flex self-end items-center gap-2 mt-2">
          <Button
            className="bg-white text-red-700 border-2 border-white hover:border-2 hover:border-red-700 px-4 lg:px-8"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="border-2 border-[#D2232D] px-4 lg:px-10"
            onClick={openNewInvoiceForm}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectClientModal;
