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
import { IoEyeOutline } from "react-icons/io5";
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
import EditInvoicesForm from "./_components/EditInvoicesForm";
import { ClientType } from "@/types/ClientType";
import NewInvoicesForm from "./_components/NewInvoicesForm";

const Invoices = () => {
  useAuthentication();

  const [isSelectClientModalOpen, setSelectClientModalOpen] = useState(false);
  const [isDeleteInvoiceModalOpen, setDeleteInvoiceModalOpen] = useState(false);
  const [isNewInvoicesFormOpen, setNewInvoicesFormOpen] = useState(false);
  const [isEditInvoicesFormOpen, setEditInvoicesFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

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
  const openDeleteInvoiceModal = () => {
    setDeleteInvoiceModalOpen(true);
  };
  const closeDeleteInvoiceModal = () => {
    setDeleteInvoiceModalOpen(false);
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
  const openEditInvoicesForm = () => {
    setEditInvoicesFormOpen(true);
  };
  const closeEditInvoicesForm = () => {
    setEditInvoicesFormOpen(false);
  };

  useEffect(() => {
    document.title = "Invoices - Invoice Application";
    console.log(
      data && data.data.clients.filter((client) => client.invoices.length > 0)
    );
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
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱0.00m PHP
            </h1>
            <p className="text-[#BBBBBB] text-xs">Overdue</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱0.00m PHP
            </h1>
            <p className="text-[#BBBBBB] text-xs">Total Outstanding</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-[#D2232D] text-md lg:text-2xl">
              ₱0.00m PHP
            </h1>
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
                data?.data?.clients?.map((client) =>
                  client?.invoices?.length > 0
                    ? client?.invoices?.map((invoice) => (
                      <TableRow
                        key={invoice.id}
                        className={
                          invoice.id % 2 === 0 ? "bg-[#FBE9EA]" : "bg-white"
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
                            {new Date(
                              invoice.issuedDate
                            ).toLocaleDateString()}
                          </label>
                          <label className="text-sm">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </label>
                        </TableCell>
                        <TableCell>
                          ₱{" "}
                          {parseFloat(
                            invoice.totalOutstanding
                          ).toLocaleString()}{" "}
                          PHP
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Button className="bg-white px-1 lg:px-1 py-1 text-black text-sm">
                            <IoEyeOutline />
                          </Button>
                          <Button
                            className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                            onClick={openEditInvoicesForm}
                          >
                            <FaRegEdit />
                          </Button>
                          <Button
                            className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                            onClick={openDeleteInvoiceModal}
                          >
                            <MdDeleteOutline />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                    : null
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-xs md:text-md lg:text-lg text-gray-500"
                    key={null}
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
          <DeleteInvoiceModal closeModal={closeDeleteInvoiceModal} />
        </Modal>

        {/* NEW INVOICES FORM */}
        <Modal isOpen={isNewInvoicesFormOpen} onClose={closeNewInvoicesForm}>
          {isNewInvoicesFormOpen && selectedClient ? (
            <NewInvoicesForm
              client={selectedClient}
              closeModal={closeNewInvoicesForm}
            />
          ) : null}
        </Modal>

        {/* EDIT INVOICES FORM */}
        <Modal isOpen={isEditInvoicesFormOpen} onClose={closeEditInvoicesForm}>
          <EditInvoicesForm closeModal={closeEditInvoicesForm} />
        </Modal>
      </div>
    </>
  );
};

export default Invoices;
