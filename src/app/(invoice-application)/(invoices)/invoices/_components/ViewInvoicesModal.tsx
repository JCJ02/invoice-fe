import Button from "@/components/Button";
import { ClientType } from "@/types/ClientType";
import Image from "next/image";
import React, { useEffect } from "react";
import { MdAccessAlarms, MdOutlineKeyboardArrowRight } from "react-icons/md";
import lwsMainLogo from "../../../../../assets/images/lws-main-logo.png";
import formattedDate from "@/utils/date";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchClientId from "@/app/(invoice-application)/(client)/client/_hooks/useFetchClientId";
import { InvoiceType } from "@/types/InvoiceType";

type NewInvoiceFormProps = {
  closeModal: any;
  client: ClientType;
};

const ViewInvoicesModal = ({ closeModal, client }: NewInvoiceFormProps) => {
  const { data, isLoading, isError, error } = useFetchClientId(client.id);
  // console.log(`Client ID: ${client.id}`);
  // console.log("Invoices:", data?.data?.client?.invoices);

  const handleDownloadPDF = (event: React.FormEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.title = "View Invoices - Invoice Application";
  }, []);
  return (
    <>
      <form className="bg-white flex font-poppins">
        {/* NEW INVOICE MODAL */}
        <div className="flex flex-col justify-between items-start gap-4 border-r-[1px] border-[#BBBBBB] p-10 w-2/3 lg:w-[640px]">
          <div className="flex flex-col gap-4 w-full" key={client.id}>
            <h1 className="text-xl font-semibold w-full">New Invoice</h1>
            {/* INVOICE SECTION */}
            <div className="flex flex-col items-start py-12 px-8 gap-10 [box-shadow:0_0_25px_5px_rgba(0,0,0,0.1)] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-[720px] w-full">
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
                <div className="flex items-start gap-6 w-full">
                  {/* BILLED TO */}
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-xs text-red-600">Billed To</h1>
                    <div className="flex flex-col items-start">
                      <label className="text-xs">{client.companyName}</label>
                      <label className="text-xs">{`${client.firstname} ${client.lastname}`}</label>
                    </div>
                  </div>

                  {/* DATE OF ISSUE & DUE */}
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Date of Issue</h1>
                      <label className="text-xs">{formattedDate}</label>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-col items-start gap-1">
                      <h1 className="text-xs text-red-600">Invoice Number</h1>
                      <label className="text-xs">
                        {data?.data.client.invoices?.[1]?.invoiceNumber}
                      </label>
                    </div>
                  </div>
                </div>

                {/* AMOUNT DUE */}
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xs text-red-600">Amount Due (PHP)</h1>
                  <label className="text-xl">
                    ₱
                    {Number(
                      data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
                    ).toLocaleString() || "0.00"}
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 border-t-2 border-red-600 w-full">
                {/* INVOICE TABLE */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs text-red-600">
                        Description
                      </TableHead>
                      <TableHead className="text-xs text-red-600 ">
                        Due Date
                      </TableHead>
                      <TableHead className="text-xs text-red-600 ">
                        Rate
                      </TableHead>
                      <TableHead className="text-xs text-red-600 ">
                        Quantity
                      </TableHead>
                      <TableHead className="text-xs text-red-600 ">
                        Line Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-xs md:text-md lg:text-lg text-gray-500"
                        >
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : isError ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-xs md:text-md lg:text-lg text-red-500"
                        >
                          {`Error: ${
                            error?.message || "An Unknown Error Occurred."
                          }`}
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.data?.client?.invoices?.map(
                        (invoice: InvoiceType) => (
                          <TableRow className="border-0" key={invoice.id}>
                            <TableCell className="text-xs">
                              {invoice.description}
                            </TableCell>
                            <TableCell className="text-xs">
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-xs">
                              {Number(invoice.rate).toFixed(2).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs">
                              {invoice.quantity}
                            </TableCell>
                            <TableCell className="text-xs">
                              ₱
                              {Number(invoice.lineTotal)
                                .toFixed(2)
                                .toLocaleString()}
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* RESULTS */}
              <div className="flex flex-col items-end w-full">
                <div className="flex flex-col items-start w-2/5">
                  <div className="flex justify-between items-center w-full">
                    <label className="text-xs">Subtotal:</label>
                    <label className="text-xs">₱0.00</label>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-xs">Tax:</label>
                    <label className="text-xs">₱0.00</label>
                  </div>
                  <div className="flex flex-col items-start border-t-[1px] border-b-[1px] border-[#BBBBBB] py-1 my-1 w-full">
                    <div className="flex justify-between items-center w-full">
                      <label className="text-xs">Total:</label>
                      <label className="text-xs">
                        ₱
                        {Number(
                          data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
                        ).toLocaleString() || "0.00"}
                      </label>
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
                    <label className="text-xs">
                      ₱
                      {Number(
                        data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
                      ).toLocaleString() || "0.00"}
                    </label>
                  </div>
                </div>
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
              Download PDF
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

export default ViewInvoicesModal;
