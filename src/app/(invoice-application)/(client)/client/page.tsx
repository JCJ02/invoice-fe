"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
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
import { ClientType } from "@/types/ClientType";
import useFetchClients from "@/app/(invoice-application)/(client)/client/_hooks/useFetchClients";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import generatePaginationLinks from "@/utils/generatePaginationLinks";
import NewClientForm from "@/app/(invoice-application)/(client)/client/_components/NewClientForm";
import EditClient from "./_components/EditClientForm";
import ViewClientModal from "./_components/ViewClientModal";
import DeleteClientModal from "./_components/DeleteClientModal";

const Client = () => {
  useAuthentication();
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isViewClientModalOpen, setIsViewClientModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);

  const { data, isLoading, isError, error } = useFetchClients(
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

  // HANDLE OPEN AND CLOSE NEW CLIENT MODAL
  const openNewClientModal = () => setIsNewClientModalOpen(true);
  const closeNewClientModal = () => {
    setIsNewClientModalOpen(false);
  };

  // HANDLE OPEN AND CLOSE EDIT CLIENT MODAL
  const openEditClientModal = (event: React.FormEvent, client: ClientType) => {
    event.preventDefault();
    setSelectedClient(client);
    setIsEditClientModalOpen(true);
  };
  const closeEditClientModal = () => setIsEditClientModalOpen(false);

  // HANDLE OPEN AND CLOSE DELETE CLIENT MODAL
  const openDeleteClientModal = (
    event: React.FormEvent,
    client: ClientType
  ) => {
    event.preventDefault();
    setSelectedClient(client);
    setIsDeleteClientModalOpen(true);
  };
  const closeDeleteClientModal = () => setIsDeleteClientModalOpen(false);

  // HANDLE OPEN AND CLOSE VIEW CLIENT MODAL
  const openViewClientModal = (event: React.FormEvent, client: ClientType) => {
    event.preventDefault();
    setSelectedClient(client);
    setIsViewClientModalOpen(true);
  };
  const closeViewClientModal = (event: React.FormEvent) => {
    event.preventDefault();
    setIsViewClientModalOpen(false);
  };

  useEffect(() => {
    document.title = "Client - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 py-5 pl-4 pr-8 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-screen w-full">
        {/* TITLE */}
        <h1 className="font-semibold text-[#262626] text-md lg:text-2xl">
          Client
        </h1>
        <div className="flex flex-col gap-5 w-full">
          {/* 1ST SECTION */}
          <div className="flex justify-between w-full">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            <Button onClick={openNewClientModal}>New Client</Button>
          </div>
          {/* 2ND SECTION */}
          <div className="flex flex-col gap-1 w-full">
            {/* CLIENT TABLE */}
            <Table>
              <TableHeader className="bg-[#D2232D]">
                <TableRow>
                  <TableHead className="text-white text-xs md:text-md">
                    Client Name/Company Name
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Email
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Phone Number/Business Phone/Mobile Phone
                  </TableHead>
                  <TableHead className="text-white text-xs md:text-md">
                    Address
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
                      colSpan={8}
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
                      {`Error: ${error?.message || "An Unknown Error Occurred."
                        }`}
                    </TableCell>
                  </TableRow>
                ) : data && data?.data.clients.length > 0 ? (
                  data.data.clients.map((client: ClientType, index: number) => (
                    <TableRow
                      key={client.id}
                      className={index % 2 === 0 ? "bg-[#FBE9EA]" : "bg-white"}
                    >
                      <TableCell className="flex flex-col gap-1">
                        <label className="text-sm">{client.companyName}</label>
                        <label className="text-sm text-gray-500">{`${client.firstname} ${client.lastname}`}</label>
                      </TableCell>
                      <TableCell className="text-sm">{client.email}</TableCell>
                      <TableCell className="flex flex-col gap-1">
                        <label className="text-sm">{client.phoneNumber}</label>
                        <label className="text-sm">
                          {client.businessPhone}
                        </label>
                        <label className="text-sm">{client.mobilePhone}</label>
                      </TableCell>
                      <TableCell className="text-sm">
                        {client.address}
                      </TableCell>
                      <TableCell className="flex items-center gap-1 h-full">
                        {/* VIEW BUTTON */}
                        <Button
                          className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                          onClick={(event: React.FormEvent) =>
                            openViewClientModal(event, client)
                          }
                        >
                          <IoEyeOutline />
                        </Button>

                        {/* EDIT BUTTON */}
                        <Button
                          className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                          onClick={(event: React.FormEvent) => {
                            openEditClientModal(event, client);
                          }}
                        >
                          <FaRegEdit />
                        </Button>

                        {/* DELETE BUTTON */}
                        <Button
                          className="bg-white px-1 lg:px-1 py-1 text-black text-sm"
                          onClick={(event: React.FormEvent) => {
                            openDeleteClientModal(event, client);
                          }}
                        >
                          <MdDeleteOutline />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
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

                {/* Dynamic Pagination Links */}
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
        </div>

        {/* NEW CLIENT MODAL */}
        <Modal isOpen={isNewClientModalOpen} onClose={closeNewClientModal}>
          <NewClientForm closeModal={closeNewClientModal} />
        </Modal>

        {/* EDIT CLIENT MODAL */}
        <Modal isOpen={isEditClientModalOpen} onClose={closeEditClientModal}>
          {isEditClientModalOpen && selectedClient ? (
            <EditClient
              client={selectedClient}
              closeModal={closeEditClientModal}
            />
          ) : null}
        </Modal>

        {/* DELETE CLIENT */}
        <Modal
          isOpen={isDeleteClientModalOpen}
          onClose={closeDeleteClientModal}
        >
          {isDeleteClientModalOpen && selectedClient ? (
            <DeleteClientModal
              client={selectedClient}
              closeModal={closeDeleteClientModal}
            />
          ) : null}
        </Modal>

        {/* VIEW CLIENT */}
        <Modal isOpen={isViewClientModalOpen} onClose={closeViewClientModal}>
          {isViewClientModalOpen && selectedClient ? (
            <ViewClientModal
              client={selectedClient}
              closeModal={closeViewClientModal}
            />
          ) : null}
        </Modal>
      </div>
    </>
  );
};

export default Client;
