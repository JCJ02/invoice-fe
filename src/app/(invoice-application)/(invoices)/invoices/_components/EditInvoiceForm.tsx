import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LWSMainLogo from "../../../../../assets/images/lws-main-logo.png";
import { MdAccessAlarms, MdOutlineKeyboardArrowRight } from "react-icons/md";
import InputFields from "@/components/InputFields";
import { ClientType } from "@/types/ClientType";
import formattedDate from "@/utils/date";
import useEditInvoiceMutation from "../_hooks/useEditInvoiceMutation";
import useEditInvoiceForm from "../_hooks/useEditInvoiceForm";
import { InvoiceType } from "@/types/InvoiceType";
import { Bounce, toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

type EditInvoiceFormProps = {
  closeModal: any;
  client: ClientType;
  invoice: InvoiceType;
};

const EditInvoiceForm = ({
  closeModal,
  client,
  invoice,
}: EditInvoiceFormProps) => {
  const {
    currentValues,
    setCurrentValues,
    errors,
    totalOutstanding,
    handleChange,
    validateEditInvoiceForm,
  } = useEditInvoiceForm();

  useEffect(() => {
    if (invoice) {
      const invoiceWithDate = {
        ...invoice,
        dueDate: invoice.dueDate ? new Date(invoice.dueDate) : new Date(), // DEFAULT DATE IF NULL
        rate: Number(invoice.rate),
        quantity: Number(invoice.quantity),
      };
      setCurrentValues(invoiceWithDate);
    }
  }, [invoice, setCurrentValues]);

  const editInvoiceMutation = useEditInvoiceMutation(invoice.id);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateInvoice = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateEditInvoiceForm()) {
      editInvoiceMutation.mutate(currentValues, {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          console.error("Error While Updating Invoice", error);
          const message =
            "Oops, Invalid Crendentials! Please Check Your Credentials!";
          setErrorMessage(message);
        },
      });
    }
  };

  // const handleDraft = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   toast.warning("THIS FEATURE IS COMING SOON!", {
  //     toastId: "draftButton",
  //     position: "top-right",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //   });
  // };

  const handleAddADiscount = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleRequestADeposit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.title = "Edit Invoices - Invoice Application";
  }, []);
  return (
    <>
      <form
        className="bg-white flex font-poppins"
        onSubmit={handleUpdateInvoice}
      >
        {/* EDIT INVOICE FORM */}
        <div className="flex flex-col justify-between items-start gap-4 border-r-[1px] border-[#BBBBBB] p-10 w-2/3 lg:w-[640px]">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-xl font-semibold w-full">Edit Invoice</h1>
            {invoice.isDraft && (
              <div className="bg-[#D2232D33] flex items-center gap-2 py-1 pl-1 w-full">
                <h1 className="font-bold text-xs">Draft</h1>
                <p className="text-xs">
                  You created this Invoice on{" "}
                  <b>{format(invoice.issuedDate, "MMMM d, yyyy")}</b>
                </p>
              </div>
            )}
            <div className="flex flex-col items-start py-12 px-8 gap-10 [box-shadow:0_0_25px_5px_rgba(0,0,0,0.1)] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-[720px] w-full">
              {/* HEADER */}
              <div className="flex justify-between items-start gap-10 lg:gap-15 w-full">
                <Image className="w-32" alt="LWS Main Logo" src={LWSMainLogo} />
                <div className="flex flex-col items-end w-full">
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
                      <label className="text-xs">{client.companyName}</label>
                      <label className="text-xs">
                        {`${client.firstname} ${client.lastname}`}
                      </label>
                    </div>
                  </div>

                  {/* DATE OF ISSUE & DUE */}
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Date of Issue</h1>
                      <label className="text-xs">{formattedDate}</label>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Date of Issue</h1>
                      <label className="text-xs">
                        <InputFields
                          className="text-xs border-0 p-0 w-full"
                          type="date"
                          name="dueDate"
                          value={
                            currentValues.dueDate?.toISOString().split("T")[0]
                          }
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* AMOUNT DUE */}
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xs text-red-600">Amount Due (PHP)</h1>
                  <label className="text-xl">
                    {`₱${totalOutstanding.toLocaleString() || 0.0}`}
                  </label>
                </div>
              </div>

              {/* EDIT INVOICES */}
              <div className="flex flex-col items-center border-t-2 border-red-600 w-full">
                {/* FIELDS TITLE */}
                <div className="flex justify-between items-center py-2 w-full">
                  <label className="text-xs text-red-600 w-2/5">
                    Description
                  </label>
                  <label className="text-xs text-red-600 w-1/6">Rate</label>
                  <label className="text-xs text-center text-red-600 w-1/12">
                    QTY
                  </label>
                  <label className="text-xs text-center text-red-600 w-1/6">
                    Line Total
                  </label>
                </div>

                {/* INVOICE FIELDS */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col items-start w-2/5">
                    <InputFields
                      className="text-xs border-0 px-0 w-full"
                      placeholder="Description"
                      name="description"
                      value={currentValues.description}
                      onChange={handleChange}
                    />
                    {errors?.description && (
                      <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                        {errors?.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start w-1/6">
                    <InputFields
                      className="text-xs border-0 px-0 w-full"
                      placeholder="Rate"
                      type="number"
                      name="rate"
                      value={currentValues.rate}
                      onChange={handleChange}
                    />
                    {errors.rate && (
                      <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                        {errors.rate}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start w-1/12">
                    <InputFields
                      className="text-xs text-center border-0 px-0 w-full"
                      placeholder="Quantity"
                      type="number"
                      name="quantity"
                      value={currentValues.quantity || 0}
                      onChange={handleChange}
                    />
                    {errors.quantity && (
                      <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                  <InputFields
                    className="text-xs text-center border-0 px-0 w-1/6"
                    placeholder="Line Total"
                    value={(
                      (currentValues.rate || 0) * (currentValues.quantity || 0)
                    ).toLocaleString()}
                    readOnly
                  />
                </div>
                {errorMessage && (
                  <p className="font-poppins text-red-700 text-xs md:text-md w-full">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* RESULTS */}
              <div className="flex flex-col items-end w-full">
                <div className="flex flex-col items-start w-1/3">
                  <div className="flex justify-between items-center w-full">
                    <div className="self-end w-full">
                      <label className="text-xs">Subtotal:</label>
                    </div>
                    <label className="text-xs">₱0.00</label>
                  </div>
                  <Button
                    className="bg-white text-xs md:text-xs lg:text-xs text-blue-500 p-0 md:p-0 lg:p-0"
                    onClick={handleAddADiscount}
                  >
                    Add Discount
                  </Button>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-xs">Tax:</label>
                    <label className="text-xs">₱0.00</label>
                  </div>
                  <div className="flex flex-col items-start border-t-[1px] border-b-[1px] border-[#BBBBBB] py-1 my-1 w-full">
                    <div className="flex justify-between items-center w-full">
                      <label className="text-xs">Total:</label>
                      <label className="text-xs">{`₱${
                        totalOutstanding.toLocaleString() || "0.00"
                      }`}</label>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <label className="text-xs">Amount Paid:</label>
                      <label className="text-xs">₱0.00</label>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-xs text-red-600">
                      Amount Due (PHP):
                    </label>
                    <label className="text-xs">{`₱${
                      totalOutstanding.toLocaleString() || "0.00"
                    }`}</label>
                  </div>
                  <Button
                    className="bg-white text-xs md:text-xs lg:text-xs text-blue-500 p-0 md:p-0 lg:p-0"
                    onClick={handleRequestADeposit}
                  >
                    Request a Deposit
                  </Button>
                </div>
              </div>

              {/* NOTES and TERMS */}
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="flex flex-col items-start gap-1 w-full">
                  <h1 className="text-xs text-red-600">Notes</h1>
                  <Textarea
                    className="bg-white text-xs md:text-xs lg:text-xs border-0 focus:border-white placeholder-black md:placeholder-black lg:placeholder-black p-0 w-full"
                    placeholder="Enter note or bank transfer details (optional)."
                    name="notes"
                    value={currentValues.notes || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <h1 className="text-xs text-red-600">Terms</h1>
                  <Textarea
                    className="bg-white text-xs md:text-xs lg:text-xs border-0 focus:border-white placeholder-black md:placeholder-black lg:placeholder-black p-0 w-full"
                    placeholder={`Enter your terms and condition. (Pro tip: It pays to be polite. Lightweight Solutions invoice app that include “Please” and “thanks” get paid up to 2 days faster.).`}
                    name="terms"
                    value={currentValues.terms || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS SECTION */}
          <div className="flex self-end items-center gap-2">
            <Button
              className="bg-white text-xs text-red-700 px-4 lg:px-10 border-2 border-white hover:border-red-700 hover:border-2"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button className="text-xs border-2 border-[#D2232D] px-4 lg:px-10">
              Save
            </Button>
            {/* <Button
              className="text-xs border-2 border-[#D2232D] px-4 lg:px-10"
              onClick={handleDraft}
            >
              Draft
            </Button> */}
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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div>
            {/* <div className="flex justify-between items-start gap-1 py-3 border-b-[1px] border-[#BBBBBB] w-full">
              <div className="flex items-start gap-1">
                <MdAccessAlarms />
                <div className="flex flex-col items-start">
                  <label className="text-xs">Make Recurring</label>
                  <label className="text-xs text-[#BBBBBB]">
                    Bill Your Client Automatically
                  </label>
                </div>
              </div>
              <Button className="flex items-center bg-white">
                <label className="text-black text-xs">No</label>
                <MdOutlineKeyboardArrowRight className="text-black text-xs" />
              </Button>
            </div> */}

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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
                <label className="text-black text-xs">No</label>
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
              <Button
                className="flex items-center bg-white"
                onClick={(event: React.FormEvent) => event.preventDefault()}
              >
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

export default EditInvoiceForm;
