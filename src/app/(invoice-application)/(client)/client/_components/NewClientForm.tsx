import React, { useEffect, useState } from "react";
import { MdAccessAlarms, MdOutlineKeyboardArrowRight } from "react-icons/md";
import InputFields from "../../../../../components/InputFields";
import Button from "../../../../../components/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import useNewClientForm from "@/app/(invoice-application)/(client)/client/_hooks/useNewClientForm";
import useNewClientMutation from "@/app/(invoice-application)/(client)/client/_hooks/useNewClientMutation";

type NewClientFormProps = {
  closeModal: () => void;
};

const NewClientForm = ({ closeModal }: NewClientFormProps) => {
  const { values, setValues, errors, handleChange, validateNewClientForm } =
    useNewClientForm();
  const newClientMutation = useNewClientMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showBusinessNumberField, setShowBusinessNumberField] = useState(false);
  const [showMobilePhoneField, setShowMobilePhoneField] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateNewClientForm()) {
      newClientMutation.mutate(values, {
        onSuccess: () => {
          closeModal();
        },
        onError: () => {
          const message =
            "Oops, Invalid Crendentials! Please Check Your Credentials!";
          setErrorMessage(message);
        },
      });
    }
  };

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
    document.title = "New Client - Invoice Application";
  }, []);

  return (
    <>
      <form className="flex bg-white" onSubmit={handleSubmit}>
        {/* NEW CLIENT FORM */}
        <div className="flex flex-col gap-2 border-r-[1px] border-[#BBBBBB] p-8 w-2/3">
          <h1 className="text-md md:text-xl font-semibold">New Client</h1>

          {/* 1st FIELD SECTION */}
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="flex flex-col items-start w-full">
                <label className="text-xs md:text-sm">
                  First Name<b className="text-red-600">*</b>
                </label>
                <InputFields
                  className="text-xs md:text-sm w-full"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-xs md:text-sm">
                  Last Name<b className="text-red-600">*</b>
                </label>
                <InputFields
                  className="text-xs md:text-sm w-full"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-xs md:text-sm">
                Company Name<b className="text-red-600">*</b>
              </label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
              />
              {errors.companyName && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.companyName}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label className="text-xs md:text-sm">Email Address</label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label className="text-xs md:text-sm">Phone Number</label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.phoneNumber}
                </p>
              )}
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
              className={`${showBusinessNumberField
                  ? "flex flex-col items-start w-full"
                  : "hidden"
                }`}
            >
              <label className="text-xs md:text-sm">Business Number</label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="businessPhone"
                value={values.businessPhone}
                onChange={handleChange}
              />
              {errors.businessPhone && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.businessPhone}
                </p>
              )}
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
              className={`${showMobilePhoneField
                  ? "flex flex-col items-start w-full"
                  : "hidden"
                }`}
            >
              <label className="text-xs md:text-sm">Mobile Phone</label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="mobilePhone"
                value={values.mobilePhone}
                onChange={handleChange}
              />
              {errors.mobilePhone && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.mobilePhone}
                </p>
              )}
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
              className={`${showAddress ? "flex flex-col items-start w-full" : "hidden"
                }`}
            >
              <label className="text-xs md:text-sm">Address</label>
              <InputFields
                className="text-xs md:text-sm w-full"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                  {errors.address}
                </p>
              )}
            </div>
            {errorMessage && (
              <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                {errorMessage}
              </p>
            )}
          </div>

          {/* 3rd Field Section */}
          <div className="flex justify-end items-center gap-2">
            <Button
              className="bg-white lg:text-xs text-red-700 border-2 border-white hover:border-2 hover:border-red-700 py-2 px-5"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button className="lg:text-xs py-2 lg:px-8">Save</Button>
          </div>
        </div>

        {/* CLIENT SETTING SECTION */}
        <div className="flex flex-col gap-4 pt-8 pl-4 w-2/5">
          <h1 className="text-sm md:text-md font-semibold">Client Setting</h1>
          <div className="flex flex-col w-full">
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

export default NewClientForm;
