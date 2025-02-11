"use client";

import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useFetchInvoices from "./_hooks/useFetchInvoices";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import generatePaginationLinks from "@/utils/generatePaginationLinks";
import Modal from "@/components/Modal";
import SelectClientModal from "./_components/SelectClientModal";
import DeleteInvoiceModal from "./_components/DeleteInvoiceModal";
import EditInvoicesForm from "./_components/EditInvoiceForm";
import { ClientType } from "@/types/ClientType";
import NewInvoicesForm from "./_components/NewInvoicesForm";
import { InvoiceType } from "@/types/InvoiceType";
import ViewInvoicesModal from "./_components/ViewInvoicesModal";
import { format } from "date-fns";
import useFetchSumTotalOutstanding from "./_hooks/useFetchSumTotalOutstanding";
import useFetchSumDraftTotalOutstanding from "./_hooks/useFetchSumDraftTotalOutstanding";
import useFetchSumDueDateTotalOutstanding from "./_hooks/useFetchSumDueDateTotalOutstanding";

const Invoices = () => {
  useAuthentication();

  const [isSelectClientModalOpen, setSelectClientModalOpen] = useState(false);
  const [isDeleteInvoiceModalOpen, setIsDeleteInvoiceModalOpen] =
    useState(false);
  const [isNewInvoicesFormOpen, setNewInvoicesFormOpen] = useState(false);
  const [isEditInvoicesFormOpen, setEditInvoicesFormOpen] = useState(false);
  const [isViewInvoicesModalOpen, setViewInvoicesModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(
    null
  );
  const { sumTotalOutstandingData, stillLoading, hasError, showError } =
    useFetchSumTotalOutstanding();
  const {
    sumDraftTotalOutstandingData,
    draftLoading,
    draftError,
    displayError,
  } = useFetchSumDraftTotalOutstanding();
  const {
    sumDueDateTotalOutstandingData,
    dueDateLoading,
    dueDateError,
    viewError,
  } = useFetchSumDueDateTotalOutstanding();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading, isError, error } = useFetchInvoices(
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

  // HANDLE SELECT CLIENT MODAL
  const openSelectClientModal = () => {
    setSelectClientModalOpen(true);
  };
  const closeSelectClientModal = () => {
    setSelectClientModalOpen(false);
  };

  // HANDLE DELETE INVOICE MODAL
  const openDeleteInvoiceModal = (
    event: React.FormEvent,
    invoice: InvoiceType
  ) => {
    event.preventDefault();
    setSelectedInvoice(invoice);
    setIsDeleteInvoiceModalOpen(true);
  };
  const closeDeleteInvoiceModal = () => {
    setIsDeleteInvoiceModalOpen(false);
  };

  // HANDLE NEW INVOICES FORM
  const openNewInvoicesForm = (client: ClientType) => {
    setSelectedClient(client);
    setNewInvoicesFormOpen(true);
  };
  const closeNewInvoicesForm = () => {
    setNewInvoicesFormOpen(false);
  };

  // HANDLE EDIT INVOICES FORM
  const openEditInvoicesForm = (
    event: React.FormEvent,
    client: ClientType,
    invoice: InvoiceType
  ) => {
    event.preventDefault();
    setSelectedClient(client);
    setSelectedInvoice(invoice);
    setEditInvoicesFormOpen(true);
  };
  const closeEditInvoicesForm = () => {
    setEditInvoicesFormOpen(false);
  };

  // HANDLE VIEW INVOICES MODAL
  const openViewInvoicesModal = (
    event: React.FormEvent,
    client: ClientType,
    invoice: InvoiceType
  ) => {
    event.preventDefault();
    setSelectedClient(client);
    setSelectedInvoice(invoice);
    setViewInvoicesModalOpen(true);
  };
  const closeViewInvoicesModal = (event: React.FormEvent) => {
    event.preventDefault();
    setViewInvoicesModalOpen(false);
  };

  useEffect(() => {
    document.title = "Invoices - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-screen w-full">
        {/* 1ST SECTION */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-md lg:text-2xl">Invoices</h1>
          <Button onClick={openSelectClientModal}>New Invoice</Button>
        </div>
        <hr className="border-[1px] border-solid w-full" />

        {/* 2ND SECTION */}
        <div className="flex flex-col md:flex-row md:justify-around items-center gap-4 pt-2 pb-5 pl-4 pr-8 w-full">
          <div className="flex flex-col items-center">
            {dueDateLoading ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱0 PHP
              </h1>
            ) : dueDateError ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                {`Error: ${viewError?.message || "An Unknown Error Occurred."}`}
              </h1>
            ) : sumDueDateTotalOutstandingData ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱{sumDueDateTotalOutstandingData.data.sum.toLocaleString()} PHP
              </h1>
            ) : null}
            <p className="text-[#BBBBBB] text-xs">Overdue</p>
          </div>
          <div className="flex flex-col items-center">
            {stillLoading ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱0 PHP
              </h1>
            ) : hasError ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                {`Error: ${showError?.message || "An Unknown Error Occurred."}`}
              </h1>
            ) : sumTotalOutstandingData ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱{sumTotalOutstandingData.data.sum.toLocaleString()} PHP
              </h1>
            ) : null}
            <p className="text-[#BBBBBB] text-xs">Total Outstanding</p>
          </div>
          <div className="flex flex-col items-center">
            {draftLoading ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱0 PHP
              </h1>
            ) : draftError ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                {`Error: ${
                  displayError?.message || "An Unknown Error Occurred."
                }`}
              </h1>
            ) : sumDraftTotalOutstandingData ? (
              <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
                ₱{sumDraftTotalOutstandingData.data.sum.toLocaleString()} PHP
              </h1>
            ) : null}
            <p className="text-[#BBBBBB] text-xs">In Draft</p>
          </div>
        </div>
        <hr className="border-[1px] border-solid ml-4 mr-8" />

        {/* 3RD SECTION */}
        <div className="flex justify-between items-center pt-5 pl-4 pr-8 w-full">
          <h1 className="font-semibold text-sm md:text-md lg:text-xl">
            All Invoices
          </h1>
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
        </div>

        {/* 4TH SECTION */}
        <div className="flex flex-col gap-1 py-5 pl-4 pr-8 w-full">
          <Table>
            <TableHeader className="bg-[#D2232D]">
              <TableRow>
                <TableHead className="text-white text-xs md:text-md">
                  Company Name/Invoice Number
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
                    {`Error: ${error?.message || "An Unknown Error Occurred."}`}
                  </TableCell>
                </TableRow>
              ) : data && data?.data?.clients?.length > 0 ? (
                (() => {
                  let rowIndex = 0; // SEPERATE COUNTER TO TRACK ROW ORDER GLOBALLY
                  return data?.data?.clients?.flatMap((client: ClientType) =>
                    client?.invoices?.length
                      ? client?.invoices?.map((invoice: InvoiceType) => {
                          rowIndex++; // INCREMENT FOR EACH ROW
                          return (
                            <TableRow
                              key={`${client.id}-${invoice.id}`}
                              className={
                                rowIndex % 2 === 0 ? "bg-[#FBE9EA]" : "bg-white"
                              }
                              onClick={(event: React.FormEvent) =>
                                openViewInvoicesModal(event, client, invoice)
                              }
                            >
                              <TableCell className="flex flex-col gap-1">
                                <label className="text-sm">
                                  {client.companyName}
                                </label>
                                <label className="text-sm text-gray-500">
                                  {invoice.invoiceNumber}
                                </label>
                              </TableCell>
                              <TableCell>{invoice.description}</TableCell>
                              <TableCell className="flex flex-col gap-1">
                                <label className="text-sm">
                                  {/* {new Date(
                                    invoice.issuedDate
                                  ).toLocaleDateString()} */}
                                  {format(
                                    new Date(invoice.issuedDate),
                                    "dd-MM-yyyy"
                                  )}
                                </label>
                                <label className="text-sm">
                                  {/* {new Date(
                                    invoice.dueDate
                                  ).toLocaleDateString()} */}
                                  {format(
                                    new Date(invoice.dueDate),
                                    "dd-MM-yyyy"
                                  )}
                                </label>
                              </TableCell>
                              <TableCell>
                                ₱
                                {parseFloat(
                                  invoice.totalOutstanding
                                ).toLocaleString()}{" "}
                                PHP
                              </TableCell>
                              <TableCell className="flex items-center gap-1">
                                {/* EDIT INVOICES FORM */}
                                <Button
                                  className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                                  onClick={(event: React.FocusEvent) => {
                                    event.stopPropagation();
                                    openEditInvoicesForm(
                                      event,
                                      client,
                                      invoice
                                    );
                                  }}
                                >
                                  <FaRegEdit />
                                </Button>

                                {/* DELETE INVOICE MODAL */}
                                <Button
                                  className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                                  onClick={(event: React.FormEvent) => {
                                    event.stopPropagation();
                                    openDeleteInvoiceModal(event, invoice);
                                  }}
                                >
                                  <MdDeleteOutline />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : // <TableRow key={client.id}>
                        //   <TableCell
                        //     colSpan={5}
                        //     className="text-center text-xs md:text-md lg:text-lg text-gray-500"
                        //   >
                        //     No Data Found
                        //   </TableCell>
                        // </TableRow>
                        []
                  );
                })()
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-xs md:text-md lg:text-lg text-gray-500"
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
                  className="text-xs md:text-md lg:text-lg"
                />
              </PaginationItem>

              {/* DYNAMIC PAGINATION LINKS */}
              {generatePaginationLinks(
                currentPage,
                Math.ceil((data?.data?.totalClients ?? 0) / limit)
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-[#D2232D] text-white text-xs md:text-md lg:text-lg"
                        : ""
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
                  className="text-xs md:text-md lg:text-lg"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* SELECT CLIENT MODAL */}
        <Modal
          isOpen={isSelectClientModalOpen}
          onClose={closeSelectClientModal}
        >
          <SelectClientModal
            closeModal={closeSelectClientModal}
            openNewInvoicesForm={(client: ClientType) => {
              openNewInvoicesForm(client);
              closeSelectClientModal();
            }}
          />
        </Modal>

        {/* DELETE INVOICE MODAL */}
        <Modal
          isOpen={isDeleteInvoiceModalOpen}
          onClose={closeDeleteInvoiceModal}
        >
          {isDeleteInvoiceModalOpen && selectedInvoice ? (
            <DeleteInvoiceModal
              invoice={selectedInvoice}
              closeModal={closeDeleteInvoiceModal}
            />
          ) : null}
        </Modal>

        {/* NEW INVOICES FORM */}
        <Modal
          isOpen={isNewInvoicesFormOpen}
          onClose={closeNewInvoicesForm}
          className="flex-col justify-start 2xl:justify-center py-20 2xl:py-0 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-screen w-full"
        >
          {isNewInvoicesFormOpen && selectedClient ? (
            <NewInvoicesForm
              client={selectedClient}
              closeModal={closeNewInvoicesForm}
            />
          ) : null}
        </Modal>

        {/* EDIT INVOICES FORM */}
        <Modal
          isOpen={isEditInvoicesFormOpen}
          onClose={closeEditInvoicesForm}
          className="flex-col justify-start 2xl:justify-center py-20 2xl:py-0 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-screen w-full"
        >
          {isEditInvoicesFormOpen && selectedClient && selectedInvoice ? (
            <EditInvoicesForm
              client={selectedClient}
              invoice={selectedInvoice}
              closeModal={closeEditInvoicesForm}
            />
          ) : null}
        </Modal>

        <Modal
          isOpen={isViewInvoicesModalOpen}
          onClose={closeViewInvoicesModal}
          className="flex-col justify-start 2xl:justify-center py-20 2xl:py-0 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-screen w-full"
        >
          {isViewInvoicesModalOpen && selectedClient && selectedInvoice ? (
            <ViewInvoicesModal
              client={selectedClient}
              invoice={selectedInvoice}
              closeModal={closeViewInvoicesModal}
            />
          ) : null}
        </Modal>
      </div>
    </>
  );
};

export default Invoices;
