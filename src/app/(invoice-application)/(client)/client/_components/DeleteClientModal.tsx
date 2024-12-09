import Button from "@/components/Button";
import { ClientType } from "@/types/ClientType";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import useDeleteClient from "../_hooks/useDeleteClient";

type DeleteClientModalProps = {
  client: ClientType;
  closeModal: () => void;
};

const DeleteClientModal = ({ client, closeModal }: DeleteClientModalProps) => {
  const deleteClientMutation = useDeleteClient(client.id);

  const handleDelete = async () => {
    try {
      await deleteClientMutation.mutateAsync(null);
      closeModal();
    } catch (error) {
      console.error(`Failed To Delete Client: ${error}`);
    }
  };

  return (
    <>
      <div
        className="bg-[#FFFFFF] flex flex-col items-center font-poppins gap-5 py-8 px-12"
        key={client.id}
      >
        <MdDeleteOutline className="text-7xl text-red-700" />
        <h1 className="text-md md:text-lg lg:text-xl font-semibold">
          Delete Client
        </h1>
        <p className="text-xs md:text-sm lg:text-md">
          Are you sure you want to delete this Client?
        </p>
        <div className="flex items-center gap-2">
          <Button
            className="bg-[#FFFFFF] text-sm md:text-md lg:text-lg text-red-700 border-[1px] border-red-700 px-5 lg:px-8"
            onClick={closeModal}
          >
            No
          </Button>
          <Button
            className="text-sm md:text-md lg:text-lg px-5 lg:px-8"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteClientModal;