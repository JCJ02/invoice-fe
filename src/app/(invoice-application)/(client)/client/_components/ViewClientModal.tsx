import Button from "@/components/Button";
import { ClientType } from "@/types/ClientType";
import React, { useEffect } from "react";

type ViewClientModalProps = {
  client: ClientType;
  closeModal: any;
};

const ViewClientModal = ({ client, closeModal }: ViewClientModalProps) => {
  useEffect(() => {
    document.title = "View Client - Invoice Application";
  }, []);
  return (
    <>
      <div className="bg-[#FFFFFF] p-4 md:p-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-xl md:text-2xl font-semibold">View Client</h1>
          <div
            className="flex items-start gap-16 md:gap-32 w-full"
            key={client.id}
          >
            <div className="flex flex-col items-start gap-4 lg:gap-8">
              <div className="flex flex-col items-start">
                <label className="text-xs md:text-lg">
                  First Name<b className="text-red-600">*</b>
                </label>
                <label className="text-xs md:text-lg text-[#BBBBBB]">
                  {client.firstname}
                </label>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs md:text-lg">
                  Company Name<b className="text-red-600">*</b>
                </label>
                <label className="text-xs md:text-lg text-[#BBBBBB]">
                  {client.companyName}
                </label>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs md:text-lg">Phone Number</label>
                <label className="text-xs md:text-lg text-[#BBBBBB]">
                  {client.phoneNumber}
                </label>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 md:gap-8">
              <div className="flex flex-col items-start">
                <label className="text-xs md:text-lg">
                  Last Name<b className="text-red-600">*</b>
                </label>
                <label className="text-xs md:text-lg text-[#BBBBBB]">
                  {client.lastname}
                </label>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs md:text-lg">Email Address</label>
                <label className="text-xs md:text-lg text-[#BBBBBB]">
                  {client.email}
                </label>
              </div>
            </div>
          </div>
          <Button
            className="self-end mt-6 md:mt-10 px-6 lg:px-12"
            onClick={closeModal}
          >
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default ViewClientModal;
